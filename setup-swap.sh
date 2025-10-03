#!/bin/bash

# StarkMind Swap File Setup for Production Build
# This script creates a swap file to handle memory-intensive Docker builds

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SWAP_SIZE="4G"
SWAP_FILE="/swapfile"

echo -e "${BLUE}🔧 StarkMind Swap File Setup${NC}"
echo -e "${YELLOW}Creating ${SWAP_SIZE} swap file for Docker builds...${NC}"

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ This script must be run as root or with sudo${NC}"
    echo -e "${YELLOW}Usage: sudo ./setup-swap.sh${NC}"
    exit 1
fi

# Check if swap file already exists
if [ -f "$SWAP_FILE" ]; then
    echo -e "${YELLOW}⚠️  Swap file already exists at $SWAP_FILE${NC}"
    echo -e "${BLUE}Current swap status:${NC}"
    swapon --show
    echo ""
    read -p "Do you want to recreate the swap file? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Disabling existing swap file...${NC}"
        swapoff "$SWAP_FILE"
        rm -f "$SWAP_FILE"
    else
        echo -e "${GREEN}✅ Using existing swap file${NC}"
        exit 0
    fi
fi

# Check available disk space
AVAILABLE_SPACE=$(df / | awk 'NR==2 {print $4}')
REQUIRED_SPACE=$((4 * 1024 * 1024)) # 4GB in KB

if [ "$AVAILABLE_SPACE" -lt "$REQUIRED_SPACE" ]; then
    echo -e "${RED}❌ Insufficient disk space. Required: 4GB, Available: $((AVAILABLE_SPACE/1024/1024))GB${NC}"
    exit 1
fi

echo -e "${BLUE}Creating swap file...${NC}"

# Create the swap file
fallocate -l $SWAP_SIZE $SWAP_FILE

# Set correct permissions
chmod 600 $SWAP_FILE

# Set up the swap space
mkswap $SWAP_FILE

# Enable the swap file
swapon $SWAP_FILE

# Make swap permanent
if ! grep -q "$SWAP_FILE" /etc/fstab; then
    echo "$SWAP_FILE none swap sw 0 0" >> /etc/fstab
fi

# Configure swappiness (how aggressively to use swap)
echo "vm.swappiness=10" >> /etc/sysctl.conf

# Verify setup
echo -e "${GREEN}✅ Swap file created successfully!${NC}"
echo -e "${BLUE}Current memory and swap status:${NC}"
free -h
echo ""
echo -e "${BLUE}Swap file details:${NC}"
swapon --show

echo ""
echo -e "${GREEN}🎉 Swap setup complete! Your system now has additional ${SWAP_SIZE} of swap space.${NC}"
echo -e "${YELLOW}💡 This will help prevent out-of-memory errors during Docker builds.${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Run your Docker build again: ./prod.sh deploy"
echo "2. Monitor memory usage during build: docker stats"
echo ""
echo -e "${YELLOW}To remove swap later (optional):${NC}"
echo "  sudo swapoff $SWAP_FILE"
echo "  sudo rm $SWAP_FILE"
echo "  sudo sed -i '/$SWAP_FILE/d' /etc/fstab"
