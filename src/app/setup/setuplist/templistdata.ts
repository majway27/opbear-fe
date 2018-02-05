import {Setuplist} from "./setuplist";

export const LISTS: any = {

    0: {
        id:0,
        owner_id: 1,
        description: "Clothing List",
        longDescription: "The clothing we'll need for the trip.",
        category: ['test1', 'test2'],
        status: "active",
        items: ['item1', 'item2']
    },
    1: {
        id: 1,
        owner_id: 1,
        description: "Food List",
        longDescription: "Some meals that we planned.",
        category: ['test1', 'test2'],
        status: "active",
        items: ['item1', 'item2']
    },
    3: {
        id:3,
        owner_id: 1,
        description: "Hiking Gear List",
        longDescription: "Backpacks, Boots.",
        category: ['test1', 'test2'],
        status: "active",
        items: ['item1', 'item2']
    },
    4: {
        id: 4,
        owner_id: 1,
        description: "Beer and drinks",
        longDescription: "Important liquids.",
        category: ['test1', 'test2'],
        status: "active",
        items: ['item1', 'item2']
    },
    5: {
        id: 5,
        owner_id: 1,
        description: "Warm Trip Clothing.",
        longDescription: "A template list for warm trip clothing",
        category: ['test1', 'test2'],
        status: "locked",
        items: ['item1', 'item2']
    },
    6: {
        id: 6,
        owner_id: 1,
        description: "An Old List.",
        longDescription: "An archived list I don't use anymore",
        category: ['test1', 'test2'],
        status: "archived",
        items: ['item1', 'item2']
    },
    7: {
        id: 7,
        owner_id: 1,
        description: "Meals for Weekend Trip.",
        longDescription: "Breakfast, Lunch, and Dinner for 2.5 days.",
        category: ['test1', 'test2'],
        status: "locked",
        items: ['item1', 'item2']
    }
}