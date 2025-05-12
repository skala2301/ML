//import data from './data.json';
const linCanvas = document.querySelector('#lin-canvas');
const btnJsonTest = document.querySelector('#btn-json-test');
var global_data = null;


btnJsonTest.addEventListener('click', async () => {
    //console.log("DATA J:",data);
    try {
        global_data = await fetchData('./js/data.json');//await response.json();
        console.log("Data fetched: ",global_data);
        plot2D(global_data);
        
    } catch (error) {
        throw new Error("Data fetching error: "+ error);
    }

});


function plot2D(data) {
    
    const ctx = linCanvas.getContext("2d");
    ctx.clearRect(0, 0, linCanvas.width, linCanvas.height);
    
    const keys_count = Object.keys(data[0])?.length;
    const data_count = data.length;
    if(keys_count !== 2) {
        console.error("Data should have exactly 2 keys");
        return;
    }
    const x_key = Object.keys(data[0])[0];
    const y_key = Object.keys(data[0])[1];


    data.sort(
        (p1, p2) => (p1[x_key] < p2[x_key]) ? -1 : (p1[x_key] > p2[x_key]) ? 1 : 0);
    const padding = 20;
    const total_range_x = data[data_count - 1][x_key] - data[0][x_key];
    const total_range_y = data[data_count - 1][y_key] - data[0][y_key];
    const ratio_x = (linCanvas.width - (padding * 2)) / total_range_x;
    const ratio_y = (linCanvas.height - (padding * 2)) / total_range_y;

    console.log(`${data[data_count - 1][x_key]} -  ${data[0][x_key]} : ${total_range_x}`);
    data.forEach((item, index) => {
        const x = item[x_key];
        const y = item[y_key];
        const x_pos = padding + (x - data[0][x_key]) * ratio_x;
        const y_pos = (padding + ((y - data[0][y_key]) * ratio_y));
        
        ctx.fillStyle = "red";
        ctx.fillRect(x_pos, y_pos, 5, 5);
        
        if(index < data_count - 1) {
            const next_x_pos =  padding + (data[index + 1][x_key] - data[0][x_key]) * ratio_x;
            const next_y_pos = (padding + ((data[index + 1][y_key] - data[0][y_key]) * ratio_y));
            ctx.beginPath();
            ctx.moveTo(x_pos, y_pos);
            ctx.lineTo(next_x_pos, next_y_pos);
            ctx.stroke();
        }
        
    });
    
    //ctx.moveTo()
    //ctx.fillRect(20, 20, 150, 100);
};

window.addEventListener('resize', () => {
    linCanvas.width = (window.innerWidth - 100);
    linCanvas.height = (window.innerHeight - 100) / 2;
    if(global_data) {
        plot2D(global_data);
    }
    console.log("Window resized: ",window.innerWidth, window.innerHeight);
});

window.addEventListener('load', () => {
    linCanvas.width = window.innerWidth - 100;
    linCanvas.height = (window.innerHeight - 100) / 2;
    console.log("Window Loaded: ",window.innerWidth, window.innerHeight);
});
