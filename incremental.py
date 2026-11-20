
import torch
import torch.nn.functional as F
from collections import deque


def get_downstream_neighbors(node):
    layer, channel, row, col = node
    neighbors = []

    if layer == "input":
        for ch in range(6):
            for r in range(max(0, row - 4), min(27, row) + 1):
                for c in range(max(0, col - 4), min(27, col) + 1):
                    neighbors.append(("conv1", ch, r, c))

    return neighbors


def recompute_conv1(model, image, ch, row, col):
    patch = image[0, 0, row:row + 5, col:col + 5]

    weight = model.conv1.weight[ch, 0]
    bias = model.conv1.bias[ch]

    return F.relu(torch.sum(patch * weight) + bias)


def incremental_forward(model, original, modified):
    model.eval()

    with torch.no_grad():
        old_input = model.pad(original)
        new_input = model.pad(modified)

        old_conv1 = F.relu(model.conv1(old_input))
        updated_conv1 = old_conv1.clone()

        dq = deque()

        # Find changed input pixels
        for row in range(28):
            for col in range(28):
                if original[0, 0, row, col] != modified[0, 0, row, col]:
                    dq.append(("input", 0, row + 2, col + 2))

        # Find all potentially affected Conv1 neurons
        scheduled = set()

        while dq:
            node = dq.popleft()

            for neighbor in get_downstream_neighbors(node):
                scheduled.add(neighbor)

        # Recompute affected activations
        changed_nodes = deque()

        for layer, ch, row, col in sorted(scheduled):
            old_value = old_conv1[0, ch, row, col]
            new_value = recompute_conv1(model, new_input, ch, row, col)

            updated_conv1[0, ch, row, col] = new_value

            if not torch.isclose(old_value, new_value):
                changed_nodes.append(("conv1", ch, row, col))

        return updated_conv1, changed_nodes
