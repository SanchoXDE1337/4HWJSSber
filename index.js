const URL = 'https://ghibliapi.herokuapp.com/species';
const selection = document.querySelector('#selection');
const content = document.querySelector('#content');
const button = document.querySelector('#butt');
const globalResult = [];

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
    selection.appendChild(option);
};

const onLoad = async () => {
    const data = await getData(URL);
    const result = data.find(obj => obj.name === 'Cat');
    result.people.forEach(people => {
        fillSelect(people);
    });
};

const onSelectClick = () => {
    let n = selection.options.selectedIndex;
    for (let key in properties) {
        properties[key] = globalResult[n][key];
        let p = document.createElement('p');
        p.textContent = `${key} : ${properties[key]}`;
        content.appendChild(p);
    }
    button.setAttribute("disabled", "true");
};

const onSelectChange = () => {
    button.removeAttribute("disabled");
    content.innerHTML = '';
};

button.addEventListener('click', onSelectClick);
selection.addEventListener('change', onSelectChange);
window.addEventListener('load', onLoad);