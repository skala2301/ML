const buildData = async (data_route, topic, content, seccion) => {
    const contentElement = document.querySelector(`#${content}`);
    const lessonData = await fetchData(data_route);
    console.log(lessonData);
    const data = lessonData.find((item) => item.key === topic);
    
    const contentData = data.content.find(item => item.type === seccion);

    contentElement.innerHTML = "";
    contentData.data.forEach((item) => {
        const listElement = document.createElement('li');
        listElement.textContent = `${item.label} `;
        const anchorElement = document.createElement('a');
        anchorElement.href = item.url;
        anchorElement.target = "_blank";
        anchorElement.appendChild(listElement);
        
        contentElement.appendChild(anchorElement);
    }
    );

}

//`/lesson/lesson_1/special_content/content.json`