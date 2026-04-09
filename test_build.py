#!/usr/bin/env python3
"""Test frontend build status"""

import subprocess
import os
import sys

os.chdir(r'c:\anasflow-master\frontend-next')

print("=" * 70)
print("TESTING FRONTEND BUILD")
print("=" * 70)
print()

# Check if node_modules exists
if not os.path.exists('node_modules'):
    print("⚠️  Installing dependencies...")
    result = subprocess.run(['npm', 'install'], capture_output=True, text=True)
    if result.returncode != 0:
        print("❌ npm install failed!")
        print(result.stderr)
        sys.exit(1)
    print("✓ Dependencies installed")
    print()

# Try to build
print("Building Next.js application...")
print("-" * 70)
result = subprocess.run(['npm', 'run', 'build'], capture_output=True, text=True)

if result.returncode == 0:
    print("✓ BUILD SUCCESSFUL!")
    print()
    print("Output:")
    print(result.stdout)
    print()
    print("=" * 70)
    print("✓ Frontend builds correctly!")
    print("✓ Ready for Netlify deployment!")
    print("=" * 70)
else:
    print("❌ BUILD FAILED!")
    print()
    print("Error Output:")
    print(result.stderr)
    print()
    print("Standard Output:")
    print(result.stdout)
    print()
    print("=" * 70)
    print("❌ There are build errors!")
    print("Must fix before Netlify will work")
    print("=" * 70)
    sys.exit(1)
