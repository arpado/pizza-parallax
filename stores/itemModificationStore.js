import { defineStore } from 'pinia';
import { getItemData } from '@/composables/serverRequests'

// This is the object which gets sent to the cart, containing all the neccessary data, when the user clicks the "Send to cart" button
class OrderItemClassInstance {
    constructor(name, id, type, selectedProps, props, selectedOptions, quantity, price) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.selectedProps = selectedProps;
        this.props = props;
        this.selectedOptions = selectedOptions;
        this.quantity = quantity;
        this.price = price;
        this.sumPrice = this.quantity * this.price;
    }
}

// Helper object, contains the data for the different properties (eg.: size, crust, etc). The options under this should be mutually exclusive (only one can be and should be active).
class propOptionsList {
    constructor(name, description, data) {
        this.name = name;
        this.description = description;
        this.data = data;
    }
}

export const useItemModificationStore = defineStore('itemModification', {
    state: () => {
        return {
            itemOnMod: null,
            // selectedProps: {},
            // additionalOptions: [],
            // selectedOptions: [],
            selectedItemQuantity: 1,
            // itemProps: {},

            aggregatedProps: {
                selectedProps: {},
                propOptions: {},
                additionalOptions: [],
                selectedOptions: [],
            }
        }
    },
    actions: {
        // INITIAL SETUP METHODS//
        // If the item is NOT already on modification then clears the props, options, quantity, etc., then puts the new item on itemOnMod and calls the getAdditionalOptionsList() to fill the previously cleared stuff.
        async loadItem(item) {
            if (this.itemOnMod !== item) {
                this.selectedItemQuantity = 1
                this.itemOnMod = item
                let result = await this.getAdditionalOptionsList(item)
                this.aggregatedProps.propOptions = result.propOptions
                this.aggregatedProps.selectedProps = result.selectedProps
                this.aggregatedProps.additionalOptions = result.additionalOptions
            }
        },
        // Checks table name then determines and creates the extra options for the selection plus the predefined selections if there should be any
        async getAdditionalOptionsList(item) {
            // if(!item) {
            //     return console.error('Error: No item set in function getAdditionalOptionsList!')
            // }
            let result = {
                selectedProps: {},
                propOptions: {},
                additionalOptions: [],
                selectedOptions: [],
            }
            switch (item.table) {
                case "pizzas":
                    // get size
                    // the sizeData modifies the original source - not that it matters for api reqs, but can screw with test mocks
                    let sizeData = await getItemData('pizzas', `size(name), price`, [{ name: item.name }], 'price')
                    // flatten data
                    sizeData.data.forEach(elem => {
                        elem.name = elem.size.name
                        // delete elem.size
                    })
                    result.propOptions.size = new propOptionsList('size', 'Select pizza size', sizeData.data)

                    // presets selected size on front-end
                    result.selectedProps.size = result.propOptions.size.data[1].name

                    // get crust
                    let crustData = await getItemData('crusts', `name, price`, null, 'price')
                    result.propOptions.crust = new propOptionsList('crust', 'Select pizza crust', crustData.data)

                    // presets selected crust on front-end
                    result.selectedProps.crust = result.propOptions.crust.data[1].name

                    // get toppings
                    let toppings = await getItemData('toppings', `name, price`, null, 'name')
                    result.additionalOptions.push({ title: 'Toppings', data: toppings.data })
                    return result
                    // break;

                case "drinks":
                    let drinkSizeData = await getItemData('drinks', `size(name), price`, [{ name: item.name }], 'price')
                    // drinkSizeData.data.forEach(elem => {
                    //     elem.name = elem.size.name
                    //     delete elem.size
                    // })
                    result.propOptions.size = new propOptionsList('size', 'Select drink size', drinkSizeData.data)
                    result.selectedProps.size = result.propOptions.size.data[1].name
                    return result
                    // break;

                case "desserts":
                    return 'Desserts not available yet!'
                    // break;
                default:
                    console.error('Error in additional options')
                    break;
            }
        },
        // getPropSelectors(item) {
        //     // sets up the pre-assigned selectedProps in the json
        //     const selectedProps = {}
        //     for (const [key, value] of Object.entries(item)) {
        //         selectedProps[value.selector] = value.data.filter((elem) => elem.isSelected)[0].name
        //     }
        //     return selectedProps
        // },

        // QUANTITY INREMENTER AND DECREMENTER
        fewerItem() {
            if (this.selectedItemQuantity > 1) {
                this.selectedItemQuantity--;
            }
        },
        moreItem() {
            this.selectedItemQuantity++;
        },

        // FINALIZATION
        createItem() {
            let itemPrice = this.getPropPrices() + this.getAdditionalOptionsPrice()
            let selectedPropsFinal = this.getSelectedProps()
            return new OrderItemClassInstance(this.itemOnMod.name, this.itemOnMod.id, this.itemOnMod.table, this.aggregatedProps.selectedProps, selectedPropsFinal, this.aggregatedProps.selectedOptions, this.selectedItemQuantity, itemPrice)
        },

        // FINALIZATION HELPER FUNCTIONS //
        getSelectedProps() {
            const props = {}
            if (Object.keys(this.aggregatedProps.selectedProps).length) {
                for (const [key, value] of Object.entries(this.aggregatedProps.selectedProps)) {
                    props[key] = this.aggregatedProps.propOptions[key].data.filter(e => e.name === this.aggregatedProps.selectedProps[key])[0]
                }
            }
            return props
        },
        getPropPrices() {
            const selectedProps = this.getSelectedProps()
            let price = 0
            if (selectedProps) {
                for (const [key, value] of Object.entries(selectedProps)) {
                    price += value.price
                }
            }
            return price
        },
        // Goes through the selectedOptions and gets the price for them
        getAdditionalOptionsPrice() {
            // CHECK IF THIS SHOULD RETURN AND OBJECT, THE ORDER IN THE ARRAY MIGHT CAUSE PROBLEM!
            let selectedOptionsPriceList = [];
            //ezt itt egy felsobb szinten is le kell jataszani az extras array elemeire, arra az esetre, ha tobb valaszthato array is van
            this.aggregatedProps.selectedOptions.forEach((option) => {
                for (let i = 0; i < this.aggregatedProps.additionalOptions.length; i++) {
                    let elem = this.aggregatedProps.additionalOptions[i].data.filter((elem) => elem.name === option);
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
    },
    getters: {
        getSumItemPrice(state) {
            return ((state.getPropPrices() + this.getAdditionalOptionsPrice()) * state.selectedItemQuantity).toFixed(2)
        },
    }
})
