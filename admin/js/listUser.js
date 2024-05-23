
const btnAdd = document.getElementById("btn-add")
const form = document.getElementById("form-scope")
const categoryName = document.getElementById('name')
const errorName = document.getElementById("error-name")
const btnCancel = document.getElementById("btn-cancel")
const btnSubmit = document.getElementById("btn-submit")
const btnSearch = document.getElementById("btn-search")
const tableCategory = document.getElementById("tbody")

let sortBy = "All";

let idUpdate = null;
const CATEGORY_LOCAL = "accounts";
const textSearch = document.getElementById("text-search");

btnSearch.addEventListener("click", function () {


    // const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || []

    // const categoryFilter = categorys.filter(item => item.username.toLowerCase().includes(textSearch))
    // console.log("data filter: ", categoryFilter);
    // render(categoryFilter);
    render()
})

btnAdd.addEventListener('click', function () {
    form.classList.remove('hidden')
})

btnCancel.addEventListener("click", function () {
    categoryName.value = '';
    errorName.innerHTML = '';
    btnSubmit.innerText = "Add";
    idUpdate = null;
    form.classList.add("hidden");
})
function submitForm(event) {
    event.preventDefault();
    if (idUpdate) {
        const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
        if (categoryName.value.length < 2) {
            errorName.innerText = `Lỗi`;
            return;
        } else {
            errorName.innerText = ``;
        }

        const index = categorys.findIndex(item => item.name === categoryName.value)
        if (index !== -1) {
            errorName.innerText = "Name bị trùng";
            return
        }
        else {
            errorName.innerText = "";
        }
        const indexUpdate = categorys.findIndex(item => item.id === idUpdate)
        categorys[indexUpdate].name = categoryName.value;
        localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

        btnCancel.click()

        idUpdate = null;
        render()



        return
    }
    else {
        errorName.innerText = "";
    }

    let id = 1;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL)) || [];
    if (categorys.length > 0) {
        id = categorys[categorys.length - 1].id + 1
    }
    if (categoryName.value.length < 2) {
        errorName.innerText = `Lỗi`;
        return;
    } else {
        errorName.innerText = ``;
    }

    const index = categorys.findIndex(item => item.name === categoryName.value)
    if (index !== -1) {
        errorName.innerText = "Name bị trùng";
        return
    }
    else {
        errorName.innerText = "";
    }
    const category = {
        id,
        name: categoryName.value,
        status: true,

    }

    categorys.push(category)

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))


    categoryName.value = "";

    form.classList.add("hidden")

    render();

}

function render(data) {
    let categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL));

    if (Array.isArray(data)) {
        categorys = data
    }

    let stringHTML = ``;

    if (sortBy == "aToZ") {
        categorys = categorys.sort(function (a, b) {
            var x = a.username.toLowerCase();
            var y = b.username.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        })
    }
    else if (sortBy == "zToA") {
        categorys = categorys.sort(function (a, b) {
            var x = a.username.toLowerCase();
            var y = b.username.toLowerCase();
            return x > y ? -1 : x < y ? 0 : 1;
        })
    }
    else if (sortBy == "STTAscending") {
        categorys = categorys.sort();
    }
    else if (sortBy == "STTDescending") {
        categorys = categorys.reverse();
    }
    //lọc theo gender
    else if (sortBy !== "All") {
        categorys = categorys.filter(
            (product) => product.username === sortBy
        );
    }

    // searchInput

    categorys = categorys.filter(item => item.username.toLowerCase().includes(textSearch.value));

    console.log("filter: ", categorys);

    // categorys = categorys.filter((user) =>
    //     user.username.toLowerCase().includes("")
    // )

    for (let i in categorys) {
        stringHTML +=
            `
            <tr>
                <td>${categorys[i].id}</td>
                <td>${categorys[i].username}</td>
                <td>${categorys[i].status ? "Active" : "Block"}</td>
                <td>
                    <button onclick="changeStatus(${categorys[i].id})">${categorys[i].status ? "Block" : "Active"}</button>
                </td>
            </tr>
        `}
    tableCategory.innerHTML = stringHTML;
}

render();


function deleteCategorys(id) {

    const result = confirm(`Are you sure delete id:${id}`)
    if (!result) {
        return;
    }
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id);

    categorys.splice(index, 1)
    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys));

    render();
}


function initUpdate(id) {
    idUpdate = id;
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categoryName.value = categorys[index].name;
    form.classList.remove("hidden")
    btnSubmit.innerText = "Update";
}

function changeStatus(id) {
    const categorys = JSON.parse(localStorage.getItem(CATEGORY_LOCAL))

    const index = categorys.findIndex(item => item.id === id)

    categorys[index].status = !categorys[index].status

    localStorage.setItem(CATEGORY_LOCAL, JSON.stringify(categorys))

    render();
}

// hàm đọc gt từ selectinput
function changeCategory(e) {
    // console.log(e.target.value);
    sortBy = e.target.value;
    currentPage = 1;
    render();
}

// // phân trang
// const pageList = document.getElementById("page-list");
// let pageSize = 5;
// let totalPage = 1;
// let currentPage = 1;

// // MOVEPAGE
// let tests = document.querySelectorAll("page-number");
// function movePage(index) {
//     currentPage = index;
//     renderAccount();
// }

// // RENDER
// // let start = 0;
// // let end = 0;
// function renderAccount(data) {
//     let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
//     if (Array.isArray(data)) {
//         accounts = data;
//     }

//     totalPage = Math.ceil(accounts.length / 5);
//     let page = "";
//     for (let i = 1; i <= totalPage; i++) {
//         if (currentPage == i) {
//             page += <span onclick="movePage(${i})" class="page-number active-page">${i}</span>;
//         } else {
//             page += <span onclick="movePage(${i})" class="page-number ">${i}</span>;
//         }
//     }
//     pageList.innerHTML = page;
//     let start = 0;
//     let end = 0;
//     start = (currentPage - 1) * pageSize;
//     end = pageSize * currentPage - 1;

//     let trHtml = "";

//     if (accounts.length < end) {
//         end = accounts.length - 1;
//     }

//     for (let i = start; i <= end; i++) {
//         stringHTML +=
//             `
//             <tr>
//                 <td>${categorys[i].id}</td>
//                 <td>${categorys[i].username}</td>
//                 <td>${categorys[i].status ? "Active" : "Block"}</td>
//                 <td>
//                     <button onclick="changeStatus(${categorys[i].id})">${categorys[i].status ? "Block" : "Active"}</button>
//                 </td>
//             </tr>
//         `}
//     tableCategory.innerHTML = stringHTML;
// }


// renderAccount();