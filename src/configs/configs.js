export const SpecialRuleType = {
    PriceDrop  : "PriceDrop",
    GetMore : "GetMore"
}

export const DiscountType = [
    {
        title : "Associate",
        percentageDiscount : 5 
    },
    {
        title : "Diamond",
        percentageDiscount : 20
    }
]

export const SpecialPricingDeal = {
    "Kone" : function (noItems) {
        let discount = 0;
        if(noItems >=3){
            discount = noItems*PriceData["Kone"] - noItems*DiscountedPriceData["Kone"];
        }
        return {
            ruletype : SpecialRuleType.PriceDrop,
            val : discount
        };
    },
    "Ironhide Cartridge" : function (noItems) {
        return {
            ruletype : SpecialRuleType.GetMore,
            val : parseInt(noItems/2)
        };
    }
}

export const PriceData = {
    "Kone" : 3488.99,
    "Ironhide Cartridge" : 529.99
}
export const DiscountedPriceData = {
    "Kone" : 2588.99,
}


