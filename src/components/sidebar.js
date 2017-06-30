import {module} from 'angular';

class Item {
    constructor(name, sref) {
        this.name = name;
        this.sref = sref;
    }
}

class ItemGroup {
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }
}

function item(name, sref) {
    return new Item(name, sref);
}

function group(name, items) {
    return new ItemGroup(name, items);
}

class SidebarController {
    constructor() {
        this.items = [
            group('报表组1', [
                group('小报表组2', [
                    item('报表3', ''),
                    item('报表4', ''),
                    item('报表5', '')
                ]),
                group('小报表组6', [
                    item('报表7', ''),
                    item('报表8', ''),
                    item('报表9', '')
                ])
            ]),
            group('报表组10', [
                group('小报表组11', [
                    item('报表12', ''),
                    item('报表13', ''),
                    item('报表14', '')
                ]),
                item('报表15', ''),
                item('报表16', ''),
                item('报表17', '')
            ])
        ];
    }

    toggle(item) {
        if (this.last === item) {
            item.actived = !item.actived;
        } else {
            if (this.last)
                this.last.actived = false;
            item.actived = true;
            this.last = item;
        }
    }
}

export default module('myApp.sidebar', []).component('sidebar', {
    template: require('./sidebar.html'),
    controller: SidebarController,
    controllerAs: 'sidebar'
});