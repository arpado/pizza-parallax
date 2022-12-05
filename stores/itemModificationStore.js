import { defineStore } from 'pinia';
import { toppingsList, sauceList } from '@/content/extras.json'

class OrderItemClassInstance {
    constructor(name, type, propSelectors, props, selectedOptions, quantity, price) {
        this.name = name;
        this.type = type;
        this.propSelectors = propSelectors;
        this.props = props;
        this.selectedOptions = selectedOptions;
        this.quantity = quantity;
        this.price = price;
        this.sumPrice = this.quantity * this.price;
    }
}

export const useItemModificationStore = defineStore('itemModification', {
    state: () => {
        return {
            // itemBlueprint: null,
            itemOnMod: null,
            orderItem: null,
            propSelectors: null,
            additionalOptions: [],
            selectedOptions: [],
            selectedItemQuantity: 1,
        }
    },
    actions: {
        loadItem(item) {
            if (this.itemOnMod !== item) {
                this.itemOnMod = item
                this.additionalOptions = this.getAdditionalOptionsList(item.type)
                this.propSelectors = this.getPropSelectors(item.props)
            }
        },

        // INITIAL SETUP METHODS//

        getAdditionalOptionsList(type) {
            const additionalOptions = []
            switch (type) {
                case "pizza":
                    additionalOptions.push(toppingsList)
                    additionalOptions.push(sauceList)
                    break;
                case "drink":
                    // this.additionalOptions.push()
                    break;
                case "dessert":
                    // this.additionalOptions.push()
                    break;
                default:
                    console.log('error in additional options')
                    break;
            }
            return additionalOptions
        },
        getPropSelectors(item) {
            // sets up the pre-assigned selectedProps in the json
            const selectedProps = {}
            for (const [key, value] of Object.entries(item)) {
                selectedProps[value.selector] = value.data.filter((elem) => elem.isSelected)[0].name
            }
            return selectedProps
        },
        getAdditionalOptionsPrice() {
            let selectedOptionsPriceList = [];

            //ezt itt egy felsobb szinten is le kell jataszani az extras array elemeire
            this.selectedOptions.forEach((option) => {
                for (let i = 0; i < this.additionalOptions.length; i++) {
                    let elem = this.additionalOptions[i].data.filter((elem) => elem.name === option);
                    if (elem.length) {
                        selectedOptionsPriceList.push(elem[0].price);
                    }
                }
            });

            let selectedOptionsPrice = selectedOptionsPriceList.reduce(
                (accum, curr) => accum + curr,
                0
            );

            return selectedOptionsPrice;
        },
        fewerItem() {
            if (this.selectedItemQuantity > 1) {
                this.selectedItemQuantity--;
            }
        },
        moreItem() {
            this.selectedItemQuantity++;
        },
       
        createItem() {
            let itemPrice = this.getPropPrices() + this.getAdditionalOptionsPrice()
            let selectedProps = this.getSelectedProps()
            this.orderItem = new OrderItemClassInstance(this.itemOnMod.name, this.itemOnMod.type, this.propSelectors, selectedProps, this.selectedOptions, this.selectedItemQuantity, itemPrice)
        },
        getSelectedProps() {
            const props = {}
            if (Object.keys(this.propSelectors).length) {
                for (const [key, value] of Object.entries(this.propSelectors)) {
                    // if there are valid propSelectors goes through the new items selected props
                    // eg.: key = "sizeSelected"
                    // eg.: value = "medium"
                    let selectedProp = key
                    let list = {}
                    for (const [key, value] of Object.entries(this.itemOnMod.props)) {
                        // goes through the origins props, gets the one according to the propSelector
                        // eg.: key = "sizeList"
                        // eg.: value.data = {size: "medium", price: 0.99}
                        // nb.: selector is just a regular key here: {selector: "sizeSelected"}
                        if (value.selector.includes(selectedProp)) {
                            list = value.data
                        }
                    }
                    // filters the origin data for the items selectedProp, gets the presumably only match
                    props[key] = list.filter((elem) => elem.name === value)[0]
                }
            }
            // EZ ITT NEM PURE FUNCTION!!!
            // state.orderItem.props = props
            return props
        },
        getPropPrices() {
            const selectedProps = this.getSelectedProps()
            let price = 0
            for (const [key, value] of Object.entries(selectedProps)) {
                price += value.price
            }
            return price
        },
    },
    getters: {
        getSumItemPrice(state) {
            return ((state.getPropPrices() + this.getAdditionalOptionsPrice()) * state.selectedItemQuantity).toFixed(2)
        },
    }
})

// ********************* incoming JSON structure ********************** //
// 
// [
//     {
//         "name": "Margharita",
//         "type": "pizza",
//         "image": "pizza-ready-cropped.jpg",
//         "description": "tomato, cheese",
//         "propNames": [
//             "Size",
//             "Crust"
//         ],
//         "props": {
//             "sizeList": {
//                 "selector": "sizeSelected",
//                 "description": "Select pizza size",
//                 "data": [
//                     {
//                         "name": "small",
//                         "price": 0.99,
//                         "isSelected": false
//                     },
//                     {
//                         "name": "medium",
//                         "price": 1.49,
//                         "isSelected": true
//                     },
//                     {
//                         "name": "large",
//                         "price": 1.99,
//                         "isSelected": false
//                     },
//                     {
//                         "name": "extra large",
//                         "price": 2.49,
//                         "isSelected": false
//                     }
//                 ]
//             },
//             "crustList": {
//                 "selector": "crustSelected",
//                 "description": "Select crust thickness",
//                 "data": [
//                     {
//                         "name": "thin",
//                         "price": 0.0,
//                         "isSelected": true
//                     },
//                     {
//                         "name": "thick",
//                         "price": 0.49,
//                         "isSelected": false
//                     },
//                     {
//                         "name": "cheese",
//                         "price": 0.99,
//                         "isSelected": false
//                     }
//                 ]
//             }
//         },
//         "possibleExtras": {
//             "extra toppings": ""
//         }
//     }
// ]
// 
// ******************************************************************** //
