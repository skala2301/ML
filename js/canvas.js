//import data from './data.json';
const linCanvas = document.querySelector('#lin-canvas');
const btnJsonTest = document.querySelector('#btn-json-test');
var global_data = null;


btnJsonTest.addEventListener('click', async () => {
    //console.log("DATA J:",data);
    try {
        global_data = await fetchData('/js/data.json');//await response.json();
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
    const padding_x = 40;
    const padding_y = 20;
    const x_divisions = 10;
    const y_divisions = 10;
    const total_range_x = data[data_count - 1][x_key] - data[0][x_key];
    const total_range_y = data[data_count - 1][y_key] - data[0][y_key];
    const ratio_x = (linCanvas.width - (padding_x * 2)) / total_range_x;
    const ratio_y = (linCanvas.height - (padding_y * 2)) / total_range_y;
    const x_step = total_range_x / x_divisions;
    const y_step = total_range_y / y_divisions;
    const x_labels = [];
    const y_labels = [];
    for(let i = 0; i <= x_divisions; i++) {
        ctx.beginPath();
        ctx.moveTo(padding_x + (i * x_step * ratio_x), padding_y);
        ctx.lineTo(padding_x + (i * x_step * ratio_x), linCanvas.height - padding_y);
        ctx.stroke();
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.fillText((data[0][x_key] + (i * x_step)).toFixed(2), padding_x + (i * x_step * ratio_x), linCanvas.height - padding_y + 15);
    }
    for(let i = 0; i <= y_divisions; i++) {
        ctx.beginPath();
        ctx.moveTo(padding_x, padding_y + (i * y_step * ratio_y));
        ctx.lineTo(linCanvas.width - padding_x, padding_y + (i * y_step * ratio_y));
        ctx.stroke();
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.fillText((data[0][y_key] + (i * y_step)).toFixed(2), padding_x - 30, padding_y + (i * y_step * ratio_y));
    }
    

    
    data.forEach((item, index) => {
        const x = item[x_key];
        const y = item[y_key];
        const x_pos = padding_x + (x - data[0][x_key]) * ratio_x;
        const y_pos = (padding_y + ((y - data[0][y_key]) * ratio_y));
        
        ctx.fillStyle = "red";
        ctx.fillRect(x_pos, y_pos, 5, 5);
        ctx.strokeStyle = "black";
        
        if(index < data_count - 1) {
            const next_x_pos =  padding_x + (data[index + 1][x_key] - data[0][x_key]) * ratio_x;
            const next_y_pos = (padding_y + ((data[index + 1][y_key] - data[0][y_key]) * ratio_y));
            ctx.beginPath();
            ctx.moveTo(x_pos, y_pos);
            ctx.lineTo(next_x_pos, next_y_pos);
            ctx.stroke();
            
        }
        
    });
    
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
