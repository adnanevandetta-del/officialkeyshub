"""Bake the low sun's terrain shadows into a texture (no shadow maps at render time).
Sun from the west-north-west, about 20 degrees high. Heights as the page uses them: metres / 1000 * EX.
usage: $LIB/.venv/bin/python -I tools/bake.py <project>  -> assets/shadow.png
"""
import sys, os, json, math
import numpy as np
from PIL import Image
from scipy import ndimage
A = os.path.join(sys.argv[1], 'assets'); EX = 5.0
SUN = np.array([-150.0, 62.0, -70.0]); hor = math.hypot(SUN[0], SUN[2]); TAN = SUN[1] / hor
dx, dz = SUN[0] / hor, SUN[2] / hor
m = json.load(open(os.path.join(A, 'meta.json'))); GW, GH = m['GW'], m['GH']
h = np.fromfile(os.path.join(A, 'height.bin'), '<f4').reshape(GH, GW)
y = ndimage.zoom(np.maximum(h, 0) / 1000 * EX, 2, order=1)
H, Wd = y.shape; kx = m['width_km'] / (Wd - 1); kz = m['height_km'] / (H - 1)
step = min(kx, kz) * .75; R, C = np.mgrid[0:H, 0:Wd].astype(np.float32); occ = np.zeros_like(y); d = step
while d < 140:
    hs = ndimage.map_coordinates(y, [R + dz * d / kz, C + dx * d / kx], order=1, mode='nearest')
    occ = np.maximum(occ, (hs - (y + d * TAN)) / (0.05 + d * 0.04)); d += step * (1 + d / 30)
lit = np.clip(1 - occ, 0, 1); lit = lit * lit * (3 - 2 * lit)
Image.fromarray((lit * 255 + .5).astype(np.uint8)).save(os.path.join(A, 'shadow.png')); print('shadow', Wd, H, float((lit < .5).mean()))
