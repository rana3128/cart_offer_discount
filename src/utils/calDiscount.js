import { DiscountType, PriceData, SpecialPricingDeal, SpecialRuleType, DiscountedPriceData } from "../configs/configs";


export function calculateDiscount(cartItems, selectDiscount) {
    let total = 0;
    Object.keys(cartItems).forEach(item => {
        total = total + parseInt(cartItems[item].total);
    });
    let freeItems = {};
    Object.keys(cartItems).forEach(item => {
        let specialDealApply = false;
        if(SpecialPricingDeal[item]){
            const dealrule = SpecialPricingDeal[item];
            const deal = dealrule(cartItems[item].count);
            if(deal.ruletype === SpecialRuleType.PriceDrop) {
                if(parseInt(deal.val) > 0) {
                    total = total - parseFloat(deal.val);
                    specialDealApply = true;
                }
            }
            if(deal.ruletype === SpecialRuleType.GetMore) {
                if(parseInt(deal.val) > 0) {
                    freeItems[item] = parseInt(deal.val);
                    specialDealApply = true;
                }
            }
        }

        if(!specialDealApply){
            console.log("apply % offer", selectDiscount);
            let discount = ((cartItems[item].count * PriceData[item]) * selectDiscount)/100 ;
            total = total - discount;
        }
    });

    //console.log(total, freeItems);
    return {
        total,
        freeItems
    }
}