import { defineStore } from 'pinia';
import { toppingsList, sauceList } from '@/content/extras.json'
import { createClient } from "@supabase/supabase-js";


    const supabaseUrl = "https://qykublxyqkhmvdpnkezp.supabase.co";
    // const supabaseKey = process.env.SUPABASE_KEY
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5a3VibHh5cWtobXZkcG5rZXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4NDE5OTQsImV4cCI6MTk4NjQxNzk5NH0.0gSOCBwn1dkwiX8f6twIes8gAN-Jr_aZYlBNjb1iDP4";
    const supabase = createClient(supabaseUrl, supabaseKey);

// const supabase = useSupabaseClient()

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
            propSelectors: {},
            additionalOptions: [],
            selectedOptions: [],
            selectedItemQuantity: 1,

            itemProps: {},
        }
    },
    actions: {
        async loadItem(item, table) {
            if (this.itemOnMod !== item) {
                // ezt itt modositani
                this.itemOnMod = item

                // let { data, error } = await supabase
                // .from(table)
                // .select(`size(name), price`)
                // .eq("name", item.name)
                // .order(`price`);
                // let sizesAndPrices = data;
                // this.itemOnMod.sizes = sizesAndPrices
                // this.itemOnMod.props = {}
                // this.itemOnMod.props.size = {
                //     description: "Select pizza size",
                //     data,
                // }

                // console.log(this.itemOnMod)
                // { this.additionalOptions, this.additionalProps } = 
                await this.getAdditionalOptionsList(item)
                // this.propSelectors = this.getPropSelectors(item.props)
                console.log(this.additionalOptions)
                console.log(this.additionalProps)
            }
        },

        // INITIAL SETUP METHODS//

        async getAdditionalOptionsList(item) {

            switch (item.table) {
                case "pizzas":

                    // get size

                    // let { size, error }
                    let sizeData = await supabase
                    .from('pizzas')
                    .select(`size(name), price`)
                    .eq("name", item.name)
                    .order(`price`);
                    this.itemProps.size = {}
                    this.itemProps.size.name = "size"
                    this.itemProps.size.description = "Select pizza size"
                    this.itemProps.size.data = []
                    sizeData.data.forEach(size => {
                        this.itemProps.size.data.push({
                            name: size.size.name,
                            price: size.price
                        })
                    })
                    // this.propSelectors.size = "medium - 32 cm"
                    this.propSelectors.size = this.itemProps.size.data[1].name
                    

                    // get crust
                    // let { crust, error }
                    let crustData = await supabase
                    .from('crusts')
                    .select(`name, price`)
                    .order(`price`);
                    this.itemProps.crust = {}
                    this.itemProps.crust.name = "crust"
                    this.itemProps.crust.description = "Select pizza crust"
                    this.itemProps.crust.data = []
                    crustData.data.forEach(crust => {
                        this.itemProps.crust.data.push({
                            name: crust.name,
                            price: crust.price
                        })
                    })
                    this.propSelectors.crust = this.itemProps.crust.data[1].name

                    // get toppings

                    let topping = await supabase.from('toppings').select(`name, price`).order(`name`)
                    // console.log(data)
                    this.additionalOptions.push({title: 'Toppings', data: topping.data})
                    // additionalOptions.push(toppingsList)
                    // additionalOptions.push(sauceList)
                    console.log(this.itemProps)

                    break;
                case "drinks":
                    // this.additionalOptions.push()
                    break;
                case "desserts":
                    // this.additionalOptions.push()
                    break;
                default:
                    console.log('error in additional options')
                    break;
            }
            // options.forEach(async option => {
            //     let { data, error } = await supabase.from(option).select(`name, price`).order(`name`)
            //     this.additionalOptions.push(data)
            // })
            // options.forEach(async prop => {
            //     let { data, error } = await supabase.from(prop).select(`id, name, price`).order(`id`)
            //     this.additionalProps.push(data)
            // })
            // return { additionalOptions, additionalProps }
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
            // if (Object.keys(this.propSelectors).length) {
            //     for (const [key, value] of Object.entries(this.propSelectors)) {
            //         // if there are valid propSelectors goes through the new items selected props
            //         // eg.: key = "sizeSelected"
            //         // eg.: value = "medium"
            //         let selectedProp = key
            //         let list = {}
            //         for (const [key, value] of Object.entries(this.itemOnMod.props)) {
            //             // goes through the origins props, gets the one according to the propSelector
            //             // eg.: key = "sizeList"
            //             // eg.: value.data = {size: "medium", price: 0.99}
            //             // nb.: selector is just a regular key here: {selector: "sizeSelected"}
            //             if (value.selector.includes(selectedProp)) {
            //                 list = value.data
            //             }
            //         }
            //         // filters the origin data for the items selectedProp, gets the presumably only match
            //         props[key] = list.filter((elem) => elem.name === value)[0]
            //     }
            // }
            // EZ ITT NEM PURE FUNCTION!!!
            // state.orderItem.props = props
            return props
        },
        getPropPrices() {
            const selectedProps = this.getSelectedProps()
            let price = 0
            if(selectedProps) {
                for (const [key, value] of Object.entries(selectedProps)) {
                    price += value.price
                }
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
