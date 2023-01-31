import { defineStore } from 'pinia';
import { getItemData } from '@/composables/serverRequests'

// This is the object which gets sent to the cart, containing all the neccessary data, when the user clicks the "Send to cart" button
class OrderItemClassInstance {
    constructor(name, id, type, propSelectors, props, selectedOptions, quantity, price) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.propSelectors = propSelectors;
        this.props = props;
        this.selectedOptions = selectedOptions;
        this.quantity = quantity;
        this.price = price;
        this.sumPrice = this.quantity * this.price;
    }
}

// Helper object, contains the data for the different properties (eg.: size, crust, etc). The options under this should be mutually exclusive (only one can be and should be active).
class itemProp {
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
            propSelectors: {},
            additionalOptions: [],
            selectedOptions: [],
            selectedItemQuantity: 1,
            itemProps: {},
        }
    },
    actions: {
        // INITIAL SETUP METHODS//
        // If the item is NOT already on modification then clears the props, options, quantity, etc., then puts the new item on itemOnMod and calls the getAdditionalOptionsList() to fill the previously cleared stuff.
        async loadItem(item) {
            if (this.itemOnMod !== item) {
                this.propSelectors = {}
                this.additionalOptions = []
                this.itemProps = {}
                this.selectedItemQuantity = 1
                this.itemOnMod = item
                await this.getAdditionalOptionsList(item)
            }
        },
        // Checks table name then determines and creates the extra options for the selection plus the predefined selections if there should be any
        async getAdditionalOptionsList(item) {
            switch (item.table) {
                case "pizzas":
                    // get size
                    let sizeData = await getItemData('pizzas', `size(name), price`, [{ name: item.name }], 'price')
                    // flatten data
                    sizeData.data.forEach(elem => {
                        elem.name = elem.size.name
                        delete elem.size
                    })
                    this.itemProps.size = new itemProp('size', 'Select pizza size', sizeData.data)
                    // presets selected size on front-end
                    this.propSelectors.size = this.itemProps.size.data[1].name

                    // get crust
                    let crustData = await getItemData('crusts', `name, price`, null, 'price')
                    this.itemProps.crust = new itemProp('crust', 'Select pizza crust', crustData.data)
                    // presets selected crust on front-end
                    this.propSelectors.crust = this.itemProps.crust.data[1].name

                    // get toppings
                    let topping = await getItemData('toppings', `name, price`, null, 'name')
                    this.additionalOptions.push({ title: 'Toppings', data: topping.data })
                    break;

                case "drinks":
                    let drinkSizeData = await getItemData('drinks', `size(name), price`, [{ name: item.name }], 'price')
                    drinkSizeData.data.forEach(elem => {
                        elem.name = elem.size.name
                        delete elem.size
                    })
                    this.itemProps.size = new itemProp('size', 'Select drink size', drinkSizeData.data)
                    this.propSelectors.size = this.itemProps.size.data[1].name
                    break;

                case "desserts":

                    break;
                default:
                    console.log('error in additional options')
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
            let selectedProps = this.getSelectedProps()
            return new OrderItemClassInstance(this.itemOnMod.name, this.itemOnMod.id, this.itemOnMod.type, this.propSelectors, selectedProps, this.selectedOptions, this.selectedItemQuantity, itemPrice)
        },

        // FINALIZATION HELPER FUNCTIONS //
        getSelectedProps() {
            const props = {}
            if (Object.keys(this.propSelectors).length) {
                for (const [key, value] of Object.entries(this.propSelectors)) {
                    props[key] = this.itemProps[key].data.filter(e => e.name === this.propSelectors[key])[0]
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
            let selectedOptionsPriceList = [];
            //ezt itt egy felsobb szinten is le kell jataszani az extras array elemeire, arra az esetre, ha tobb valaszthato array is van
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
    },
    getters: {
        getSumItemPrice(state) {
            return ((state.getPropPrices() + this.getAdditionalOptionsPrice()) * state.selectedItemQuantity).toFixed(2)
        },
    }
})
