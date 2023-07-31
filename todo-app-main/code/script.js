let moonBtn = document.querySelector('#img-moon')
let sunBtn = document.querySelector('#img-sun')
let imgLight = document.querySelector('#img-light')
let imgDark = document.querySelector('#img-dark')
let body = document.querySelector('body')
let newTaskParent = document.querySelector('.parent-new-task')
let headerListDetails = document.querySelector('.header__list__details')
let footerText = document.querySelector('.footer-text')
let ba = document.querySelectorAll('.header__list__details__bottom p a')
let ca = document.querySelector('.header__list__details__bottom p')


if (moonBtn) {
    moonBtn.addEventListener('click', () => {
        sunBtn.classList.add('active')
        moonBtn.classList.add('active')
        imgLight.classList.add('active')
        imgDark.classList.add('active')
        body.classList.add('active')
        newTaskParent.classList.add('active')
        headerListDetails.classList.add('active')
        footerText.classList.add('active')
        ba.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.classList.add('active')
            })
            item.addEventListener('mouseout', () => {
                item.classList.remove('active')
            })
        })

        ca.addEventListener('mouseover', () => {
            ca.classList.add('active')
        })
        ca.addEventListener('mouseout', () => {
            ca.classList.remove('active')
        })
        let type = body.classList.contains('active')
        localStorage.setItem('type', JSON.stringify(type))
    })
}

if (sunBtn) {
    sunBtn.addEventListener('click', () => {
        sunBtn.classList.remove('active')
        moonBtn.classList.remove('active')
        imgLight.classList.remove('active')
        imgDark.classList.remove('active')
        body.classList.remove('active')
        newTaskParent.classList.remove('active')
        headerListDetails.classList.remove('active')
        footerText.classList.remove('active')
        ba.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.classList.remove('active')
            })
            item.addEventListener('mouseout', () => {
                item.classList.remove('active')
            })
        })
        ca.addEventListener('mouseover', () => {
            ca.classList.remove('active')
        })
        ca.addEventListener('mouseout', () => {
            ca.classList.remove('active')
        })
        let type = body.classList.contains('active')
        localStorage.setItem('type', JSON.stringify(type))
    })
}



let addBtn = document.querySelector('.parent-new-task .cercle')
if (addBtn) {
    addBtn.addEventListener('click', () => {
        let inputValue = document.querySelector('.parent-new-task .input input').value
        if (inputValue == '' || inputValue.length < 8) {

        } else {
            let table = JSON.parse(localStorage.getItem('valeur')) ?? []
            if (table.length === 0) {
                localStorage.removeItem('positionItem')
                const conn = {
                    value: inputValue
                }
                table.push(conn)
                localStorage.setItem('valeur', JSON.stringify(table))
            } else {
                const conn = {
                    value: inputValue
                }
                table.push(conn)
                localStorage.setItem('valeur', JSON.stringify(table))
            }

            let newValeur = JSON.parse(localStorage.getItem('valeur'))
            let parentBalise = document.querySelector('.header__list__details__top')
            if (newValeur) {
                let task = ``
                newValeur.forEach(item => {
                    task += `<div class="task">
                <div class="task__top">
                    <div class="cercle">
                        <img src="./assets/images/icon-check.svg" id="icon-check" alt="">
                    </div>
                    <p>${item.value}</p>
                </div>
                <div class="task__croix">
                    <img src="./assets/images/icon-cross.svg" alt="">
                </div>
            </div>`
                })
                parentBalise.innerHTML = task
                location.reload()
                
            }
        }

    })
}



async function auto() {
    let newValeur = JSON.parse(localStorage.getItem('valeur'))
    console.log('item',newValeur.length);
    document.querySelector('.items').textContent=`${newValeur.length} items left` 
    let parentBalise = document.querySelector('.header__list__details__top')
    if (newValeur) {
        let task = ``
        newValeur.forEach(item => {
            task += `<div class="task">
                <div class="task__top">
                    <div class="cercle">
                        <img src="./assets/images/icon-check.svg" id="icon-check" alt="">
                    </div>
                    <p>${item.value}</p>
                </div>
                <div class="task__croix">
                    <img src="./assets/images/icon-cross.svg" alt="">
                </div>
            </div>`
        })
        parentBalise.innerHTML = task

    }
}
auto()


async function taskCheck() {
    let checkBtn = document.querySelectorAll('.task__top .cercle')
    if (checkBtn) {

        checkBtn.forEach((item, index) => {
            let iconCheck = item.querySelector('#icon-check')
            item.addEventListener('click', () => {
                let parentDiv = item.closest('div.task__top')
                let childrens = parentDiv.children[1]
                if (!item.classList.contains('active')) {
                    item.classList.add('active')
                    iconCheck.classList.add('active')
                    childrens.classList.add('active')
                } else {
                    item.classList.remove('active')
                    iconCheck.classList.remove('active')
                    childrens.classList.remove('active')
                }


                let etat = item.classList.contains('active')
                let table = JSON.parse(localStorage.getItem('positionItem')) ?? []
                /* if (etat === true) { */
                    if (table.length === 0) {
                        const conn = {
                            etatM: index,
                            etatCheck: etat
                        }
                        table.push(conn)
                        localStorage.setItem('positionItem', JSON.stringify(table))
                    } else {
                        const conn = {
                            etatM: index,
                            etatCheck: etat
                        }
                        table.push(conn)
                        localStorage.setItem('positionItem', JSON.stringify(table))
                    }
            })
        })
    }
}
taskCheck()

async function deleteTask() {
    let removeBtn = document.querySelectorAll('.task__croix')
    /* let positionItem = JSON.parse(localStorage.getItem('positionItem')) */
    if (removeBtn) {
        removeBtn.forEach((item,index) => {
            item.addEventListener('click', () => {
                let newValeur = JSON.parse(localStorage.getItem('valeur'))
                console.log('newvaleur', newValeur);
                let parentDiv = item.closest('div.task')
                parentDiv.remove()
                let childrens = parentDiv.children[0].children[1].textContent
                let supp = newValeur.filter(post => post.value === childrens)
                if (supp.length != 0) {
                    newValeur.splice(0, 1)
                }
                /* positionItem.splice(index-1, index) */
                localStorage.setItem('valeur', JSON.stringify(newValeur))
                /* localStorage.setItem('positionItem', JSON.stringify(positionItem)) */
                location.reload()
            })
        })
    }
}
deleteTask()

async function Clearcompleted() {
    let completedBtn = document.querySelector(' .completed a')
    if (completedBtn) {
        completedBtn.addEventListener('click', () => {
            localStorage.removeItem('valeur')
            localStorage.removeItem('positionItem')
        })
    }
} Clearcompleted()


async function etat() {
    let typeValue = JSON.parse(localStorage.getItem('type'))
    let moonBtn = document.querySelector('#img-moon')
    let sunBtn = document.querySelector('#img-sun')
    let imgLight = document.querySelector('#img-light')
    let imgDark = document.querySelector('#img-dark')
    let body = document.querySelector('body')
    let newTaskParent = document.querySelector('.parent-new-task')
    let headerListDetails = document.querySelector('.header__list__details')
    let footerText = document.querySelector('.footer-text')
    let ba = document.querySelectorAll('.header__list__details__bottom p a')
    let ca = document.querySelector('.header__list__details__bottom p')
    window.addEventListener('load', () => {
        if (typeValue === true) {
            sunBtn.classList.add('active')
            moonBtn.classList.add('active')
            imgLight.classList.add('active')
            imgDark.classList.add('active')
            body.classList.add('active')
            newTaskParent.classList.add('active')
            headerListDetails.classList.add('active')
            footerText.classList.add('active')
            ba.forEach(item => {
                item.addEventListener('mouseover', () => {
                    item.classList.add('active')
                })
                item.addEventListener('mouseout', () => {
                    item.classList.remove('active')
                })
            })

            ca.addEventListener('mouseover', () => {
                ca.classList.add('active')
            })
            ca.addEventListener('mouseout', () => {
                ca.classList.remove('active')
            })
        } else {
            sunBtn.classList.remove('active')
            moonBtn.classList.remove('active')
            imgLight.classList.remove('active')
            imgDark.classList.remove('active')
            body.classList.remove('active')
            newTaskParent.classList.remove('active')
            headerListDetails.classList.remove('active')
            footerText.classList.remove('active')
            ba.forEach(item => {
                item.addEventListener('mouseover', () => {
                    item.classList.remove('active')
                })
                item.addEventListener('mouseout', () => {
                    item.classList.remove('active')
                })
            })
            ca.addEventListener('mouseover', () => {
                ca.classList.remove('active')
            })
            ca.addEventListener('mouseout', () => {
                ca.classList.remove('active')
            })
        }
    })



    let etatCheck = JSON.parse(localStorage.getItem('etatCheck'))
    let positionItem = JSON.parse(localStorage.getItem('positionItem'))
    let checkBtn = document.querySelectorAll('.task__top .cercle')
    console.log(positionItem);
    positionItem.forEach(item => {
        console.log(item.etatM);
        let iconCheck = checkBtn[parseInt(item.etatM)].querySelector('#icon-check')
        let parentDiv = checkBtn[parseInt(item.etatM)].closest('div.task__top')
        let childrens = parentDiv.children[1]
        checkBtn.forEach(post => {
            if (item.etatCheck === true) {
                checkBtn[parseInt(item.etatM)].classList.add('active')
                iconCheck.classList.add('active')
                childrens.classList.add('active')
            } else {
                checkBtn[parseInt(item.etatM)].classList.remove('active')
                iconCheck.classList.remove('active')
                childrens.classList.remove('active')
            }
        })
    })
}
etat()