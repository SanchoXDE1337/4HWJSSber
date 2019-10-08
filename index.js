const URL = 'https://ghibliapi.herokuapp.com/species';
const selection = document.querySelector('#selection');
const selection2 = document.querySelector('#selection2');
const content = document.querySelector('#content');
const button = document.querySelector('#butt');
let globalResult = [];

let properties = {
    gender: '',
    age: '',
    eye_color: '',
    hair_color: '',
};

const getData = async (url) => {
    const rawData = await fetch(url);
    return await rawData.json();
};

const fillSelect = async (people) => {
    const data = await getData(people);
    globalResult.push(data);
    const name = data.name;
    let option = new Option(name, name);
    selection2.appendChild(option);
};

const pushOption = (data) => {
    let n = selection.options.selectedIndex;
    let result = data[n].people;
    result.forEach(people => {
        fillSelect(people);
    })
};

const onLoad = async () => {
    const data = await getData(URL);
    data.forEach(obj => {
        const name = obj.name;
        let option = new Option(name, name);
        selection.appendChild(option);
    });
    pushOption(data);
};

const onReload = async () => {
    onSelectChange();
    const data = await getData(URL);
    selection2.innerHTML = '';
    globalResult = [];
    pushOption(data);
};

const onSelectClick = () => {
    content.classList.remove('inactive');
    content.classList.add('active');
    let n = selection2.options.selectedIndex;
    for (let key in properties) {
        properties[key] = globalResult[n][key];
        let div = document.createElement('div');
        div.textContent = `${key} : ${properties[key]}`;
        content.appendChild(div);
    }
    button.setAttribute("disabled", "true");
};

const onSelectChange = () => {
    button.removeAttribute("disabled");
    content.classList.remove('active');
    content.classList.add('inactive');
    content.innerHTML = '';
};

button.addEventListener('click', onSelectClick);
selection.addEventListener('change', onReload);
selection2.addEventListener('change', onSelectChange);
window.addEventListener('load', onLoad);
