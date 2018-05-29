var menu, menuList, menuItems, menuBlock, menuItem, itemTitle, subMenu, arrow;

menuBlock = document.getElementsByClassName('menu')[0];

menuList = document.createElement('ul');

menuBlock.appendChild(menuList);

function getMenu() {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open("GET", "config.json", true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            menu = JSON.parse(xhr.responseText);
            displayMenu(menu, menuList);
            return menu;
        } 
    };
};

function displayMenu(menu) {
    menuItems = menu.menu.items;
    shovMenuItems(menuItems, menuList)
    console.log(menuItems);
}

function shovMenuItems(menuItems, menuList) {
    menuItems.forEach(function (item) {
        menuItem = document.createElement('li');
        itemTitle = document.createTextNode(item.title);

        menuItem.setAttribute('class', 'menu-item');

        menuItem.appendChild(itemTitle);
        menuList.appendChild(menuItem);

        if (item.submenu !== "" && item.submenu.length > 0 && Array.isArray(item.submenu)) {
            subMenu = document.createElement('ul');
            arrow = document.createElement('i');

            arrow.setAttribute('class', 'arrow');
            subMenu.setAttribute('class', 'sub-menu');

            menuItem.appendChild(arrow);
            menuItem.appendChild(subMenu);
            shovMenuItems(item.submenu, subMenu);
        }
    });
}


window.addEventListener('mouseup', function (event) {
    console.log(event);
    if (event.button === 2 && event.target.parentNode != menuList) {
        menuList.style.top = event.clientY + 'px';
        menuList.style.left = event.clientX + 'px';

        menuList.classList.add('show-menu');
        return;
        //console.log(event);
    } else if (event.button === 0 && event.target != menuList && event.target.parentNode != menuList) {
        menuList.classList.remove('show-menu');
        return;
    }
});


getMenu();
