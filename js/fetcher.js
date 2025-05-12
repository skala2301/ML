const fetchData = async (route) => {
    try {
        
        const response = await fetch(route);
        if(!response.ok) {
            
            console.error("Data fetching error: "+ response.statusText);
        };
        const data = await response.json();
        return data;
        // Return the fetched data
    }catch (error) {
        console.error("Data fetching error: ", error);
        return null;
    }
}
