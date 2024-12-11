// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./vendor/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./vendor/@openzeppelin/contracts/access/Ownable.sol";


contract Staking is Ownable {
    IERC20 public stakingToken;
    uint256 public rewardRate; // Rewards per block
    uint256 public totalStaked;

    struct StakeInfo {
        uint256 amount;
        uint256 rewardDebt;
    }

    mapping(address => StakeInfo) public stakes;

    uint256 public accRewardPerToken;
    uint256 public lastRewardBlock;

    constructor(IERC20 _stakingToken, uint256 _rewardRate) {
        stakingToken = _stakingToken;
        rewardRate = _rewardRate;
        lastRewardBlock = block.number;
    }

    function updatePool() internal {
        if (totalStaked == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 blocks = block.number - lastRewardBlock;
        uint256 rewards = blocks * rewardRate;
        accRewardPerToken += (rewards * 1e18) / totalStaked;
        lastRewardBlock = block.number;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        updatePool();

        StakeInfo storage userStake = stakes[msg.sender];
        if (userStake.amount > 0) {
            uint256 pending = (userStake.amount * accRewardPerToken) / 1e18 - userStake.rewardDebt;
            stakingToken.transfer(msg.sender, pending);
        }

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        userStake.amount += _amount;
        totalStaked += _amount;
        userStake.rewardDebt = (userStake.amount * accRewardPerToken) / 1e18;
    }

    function withdraw(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");

        StakeInfo storage userStake = stakes[msg.sender]; 
        require(userStake.amount >= _amount, "Insufficient staked amount");

        updatePool();

        uint256 pending = (userStake.amount * accRewardPerToken) / 1e18 - userStake.rewardDebt;
        stakingToken.transfer(msg.sender, pending);

        userStake.amount -= _amount;
        totalStaked -= _amount;
        stakingToken.transfer(msg.sender, _amount);

        userStake.rewardDebt = (userStake.amount * accRewardPerToken) / 1e18;
    }

    function pendingRewards(address _user) external view returns (uint256) {
        StakeInfo storage userStake = stakes[_user]; 
        uint256 _accRewardPerToken = accRewardPerToken;
        if (totalStaked > 0) {
            uint256 blocks = block.number - lastRewardBlock;
            uint256 rewards = blocks * rewardRate;
            _accRewardPerToken += (rewards * 1e18) / totalStaked;
        }
        return (userStake.amount * _accRewardPerToken) / 1e18 - userStake.rewardDebt;
    }
}

