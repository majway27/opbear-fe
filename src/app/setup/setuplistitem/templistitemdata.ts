import {Setuplistitem} from "./setuplistitem";

export const LISTITEMS: any = {

    0: {
        id:0,
        parentid:0,
        description: "Shirt",
        longDescription: "The clothing we'll need for the trip.",
        category: ['test1', 'test2'],
        isChecked: false,
        status: "active"
    },
    1: {
        id: 1,
        parentid:0,
        description: "Pants",
        longDescription: "Some meals that we planned.",
        category: ['test1', 'test2'],
        isChecked: true,
        status: "active"
    },
    3: {
        id:3,
        parentid:1,
        description: "Hiking Gear",
        longDescription: "Backpacks, Boots.",
        category: ['test1', 'test2'],
        isChecked: false,
        status: "active"
    },
    4: {
        id: 4,
        parentid:2,
        description: "Beer",
        longDescription: "Important liquids.",
        category: ['test1', 'test2'],
        isChecked: true,
        status: "active"
    },
    5: {
        id: 5,
        parentid:3,
        description: "Jacket",
        longDescription: "A template list for warm trip clothing",
        category: ['test1', 'test2'],
        isChecked: false,
        status: "locked"
    },
    6: {
        id: 6,
        parentid:3,
        description: "Food Item 2",
        longDescription: "An archived list I don't use anymore",
        category: ['test1', 'test2'],
        isChecked: false,
        status: "archived"
    },
    7: {
        id: 7,
        parentid:3,
        description: "Food Item 1",
        longDescription: "Breakfast, Lunch, and Dinner for 2.5 days.",
        category: ['test1', 'test2'],
        isChecked: true,
        status: "locked"
    }
}