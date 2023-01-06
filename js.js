window.onload = ()=>{
    // 1) Створити сторінку, яка отримує список порід. Список порід вивести в вигляді списку. При кліку на породу собаки, зробити запит і вивести фото поруч з назвою породи.
    //     Використати АПІ
    //     https://dog.ceo/dog-api/documentation/
    let image = document.querySelector('.image');

    const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://dog.ceo/api/breeds/list/all');
        xhr.responseType = 'json';
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                let objectData = xhr.response.message;
                for(const key in objectData){
                    let liElement = document.createElement('li')
                    liElement.innerHTML = key;
                    let ul = document.querySelector('ul')
                    ul.appendChild(liElement);
                    
                    liElement.onclick = ()=>{
                        xhr.open('GET', `https://dog.ceo/api/breed/${key}/images/random`)
                        xhr.responseType = 'json';
                        xhr.send()
                        xhr.onreadystatechange = ()=>{
                            if(xhr.readyState == 4 && xhr.status == 200){
                                let photo = xhr.response.message
                                console.log(photo)
                                
                                let img = document.createElement('img')   
                                if(image.hasChildNodes()){
                                    image.removeChild( image.childNodes[0]);
                                    img.classList.add('image')
                                    img.setAttribute('src', photo);
                                    image.appendChild(img);
                                }
                                else{
                                    img.setAttribute('src', photo)
                                    image.appendChild(img); 
                                }     
                            }
                        }   
                    }
                }
            } 
        }
        // 2) Зробити запит і отримати користувачів, отриману інформацію вивести в вигляді карточок 
        // https://jsonplaceholder.typicode.com/users
        let cardArea = document.querySelector("#cardArea")
        fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        for (const iterator of data) {
            let card = document.createElement('div');
            card.classList.add('card');
            let container = document.createElement('div');
            container.classList.add('container');
            card.appendChild(container);
            cardArea.appendChild(card);

            function spanCreate(key, info){
                let before = document.createElement('span');
                before.classList.add('before');
                before.innerHTML = `${key}:`;
                let input = document.createElement('span');
                input.innerHTML = info;
                input.classList.add('input');
                container.appendChild(before);
                container.appendChild(input);
            }
            console.log(iterator)
            for (const value in iterator) {
                if(typeof iterator[value] === 'object'){
                spanCreate(value, `${Object.values(iterator[value]).splice(0,4)}`)
                }
                else{
                spanCreate(value, iterator[value])
                }
            }
        }
    })
    // 3) Вивести список планет в вигляді карток, і зробити кнопки для фільтрування планет за розміром (при кліку на кнопку планети повині вивестись від більшого розміру до меншого і при кліку знову від меншого до більшого) Зробити такий самий фільтр по population
    //     Використати https://swapi.dev/api/planets
    let planets = document.querySelector("#planets")
    fetch('https://swapi.dev/api/planets')
    .then(response=>{
        return response.json();
    }).then(data =>{
        let result = data.results

        function addValue(){ 
        for (const iterator of result) {
            let card = document.createElement('div');
            card.classList.add('card');
            let container = document.createElement('div');
            container.classList.add('container');
            card.appendChild(container);
            planets.appendChild(card)
            
            function createValue(key, info){
                let before = document.createElement('span');
                before.classList.add('before');
                before.innerHTML = `${key}:`;
                let input = document.createElement('span');
                input.innerHTML = info;
                input.classList.add('input');
                container.appendChild(before);
                container.appendChild(input);
            }
                for (const value in iterator) {
                if(typeof iterator[value] == 'object'){
                createValue(value, Object.values(iterator[value]).splice(0,1) )
                }
                else{
                createValue(value, iterator[value])
                }
                }
            }
        }
        addValue()
        let scaleButton = document.querySelector('#scale')
        let check = false
            scaleButton.onclick = ()=>{
                while (planets.lastElementChild) {
                    planets.removeChild(planets.lastElementChild);
                  }
                if(!check){
                    result.sort((a,b)=> a.diameter - b.diameter);
                    check = true;
                }
                else{
                    result.sort((a,b)=> b.diameter - a.diameter);
                    check = false
                }
                    addValue()
            }
        let population = document.querySelector('#population')    
            population.onclick = ()=>{
                while (planets.lastElementChild) {
                    planets.removeChild(planets.lastElementChild);
                  }
                if(!check){
                    result.sort((a,b)=> a.population - b.population);
                    check = true;
                }
                else{
                    result.sort((a,b)=> b.diameter - a.diameter);
                    check = false
                }
                    addValue()
            }
        
    })
}
