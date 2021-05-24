// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Twapper
 * @dev Initiates time-weighted, average price algorithm (TWAP) for the given address.
 */
contract Twapper {

    struct Order {
    address sender;
    address token0;
    address token1;
    uint durationPerInterval; // in milliseconds
    uint tradesLeft;
    uint limitPrice; // max price in terms of token1
    uint quantityPerInterval; // qty of token0 to buy, Decimals of token0 ERC-20
    uint lastTradeTime; // timestamp in millis
    }
    
    mapping(uint => Order) public orders;
    
    uint lastOrderId = 0; // Incremental id counter for orders

    event AlgoStarted(uint orderId, uint lastTradeTime, uint durationPerInterval);
    event AlgoStartFailed(uint orderId);
    event TradeExecuted(uint orderId);
    event TradeExecuteFailed(uint orderId);

    /**
     * @dev startTwapAlgo - Start a TWAP algo order to be executed on the Uniswap exchange (will expand to other DEXs too).
     * @param token0 - ERC-20 address of token to buy
     * @param token1 - ERC-20 address of token to sell
     * @param duration - Total algo duration (in seconds)
     * @param segments - # of segments to break up order
     * @param limitPrice - Maximum price to pay
     * @param quantity - quantity of token0
     8 @
     */
    function startTwapAlgo(address token0, address token1, uint duration, uint segments, uint limitPrice, uint quantity) public {
        // Checks
        require(limitPrice > 0, "Limit price cannot be 0.");

        uint durationPerInterval = duration / segments;
        require(durationPerInterval > 0, "Duration per interval must be at least 30 seconds.");
        
        uint quantityPerInterval = quantity / segments;
        require(quantityPerInterval > 0, "Quantity per interval cannot be 0.");

        uint constant lastTradeTime = block.timestamp;
        
        // Effects
        lastOrderId += 1;
        orders[lastOrderId] = Order({
            sender: msg.sender,
            token0: token0,
            token1: token1,
            durationPerInterval: durationPerInterval,
            tradesLeft: segments,
            limitPrice: limitPrice,
            quantityPerInterval: quantityPerInterval,
            lastTradeTime: lastTradeTime
        });
        
        // Interactions
        bool success = ;// Approve this contract to manage up to limitPrice*quantity of token1 from msg.sender, or all if no limit present

        if (success) {
            AlgoStarted(lastOrderId, lastTradetime, durationPerInterval);
        } else {
            delete orders[lastOrderId];
            AlgoStartFailed(lastOrderId);
            lastOrderId -= 1;
        }
    }

    /**
     * @dev executeTrade - Execute trade for given orderId if all requirements are met
     * @param orderId - ID of order as given by startTwapAlgo event
     */
    function executeTrade(uint orderId) public {
        // Checks
        Order storage thisOrder = orders[orderId];
        require(thisOrder, "No order found.");

        uint constant private currentTime = block.timestamp;// Assume variance up to 15 seconds
        require(thisOrder.lastTradeTime + durationPerInterval <= currentTime, "Not enough time has passed.");

        // require msg.sender balance of thisOrder.token1 >= thisOrder.quantityPerInterval

        // Effects
        if (thisOrder.tradesLeft > 0) {
            thisOrder.tradesLeft -= 1;
            bool success = ;// Attempt to place trade on venue

            if (success) {
                TradeExecuted(orderId);
            } else {
                thisOrder.tradesLeft += 1;
                TradeExecuteFailed(orderId);
            }
        }

        if (thisOrder.tradesLeft == 0) {
            delete orders[orderId];
        }
    }
}
