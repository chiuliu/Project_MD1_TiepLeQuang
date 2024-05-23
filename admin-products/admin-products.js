let CATEGORY_LOCAL = 'categorys';
let productBody = document.getElementById('tbody')

//bước add danh mục
function renderCategory() {
    const categories = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
    let stringHTML = ``;
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].status) {
            stringHTML += `
            <option value="${categories[i].id}">${categories[i].name}
            </option>
            `
        }
    }
    category.innerHTML = stringHTML;
}
renderCategory();

let formProduct = document.getElementById('formProduct');
//B2:khởi tạo biến hình ảnh
let imgProduct = document.getElementById('imgProduct');

let imageBase64 = null;
let pageSize = 5;       //cho 5 phần tử vào 1 trang
let totalPage = 1;
let currentPage = 1;

function convertToBase64() {
    let fileInput = document.getElementById('modal-img')

    let file = fileInput.file[0]   //lấy cái ảnh đầu tiên để chuyển đổi ảnh sang base 64
    let reader = new fileRender();  //đọc dữ liệu của hình ảnh
    reader
    reader.onload = function (e) {
        const base64 = e.target.result;
        imageBase64 = base64;
        imgProduct.src = imageBase64;
    }
    reader.readAsDataURL(file);
}

function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

function render() {
    let products = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || []
    render(products); //để lấy hàm dưới
}

function renderProducts(products) {
    let stringHTML = '';
    let id = 1;
    if (products.length > 0) {
        id = products[products.length - 1].id + 1
    }

    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;

    if (end > products.length) {
        end = products.length;
    }
    for (let i = star; i < end; i++) {
        stringHTML +=
            `
            <tr>
            <td class="table-th table-id">${i + 1}</td>
            <td class="table-th">${products[i].name}</td>
            <td class="table-th">${products[i].category}</td>
            <td class="table-th">${formatMoney(products[i].price)}</td>
            <td class="table-th">${products[i].quantity}</td>
            <td class="table-th">
                <img class = "table-imgs" src="${products[i].image}" alt="img">
            </td>
            <td class="table-th">
            <button class="btn-active" onClick="changeStatus(${i})">${products[i].status ? `<div class="block-none">Block</div>` : `<div class="block-active">Active</div>`}</button>
            </td>
            <td class="table-th">
                <button class= "icon-btn" onclick="updateProduct(${products[i].id})">
                    <i class="icon edit-icon fa-solid fa-file-pen"></i>
                </button>
                <button class="icon-btn" onclick="deleteProduct(${products[i].id})">
                    <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                </button>
            </td>
        </tr>
        `
    }
    productBody.innerHTML = stringHTML;
}