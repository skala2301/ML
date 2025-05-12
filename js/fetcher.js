const fetchData = async (route) => {
    try {
        const host = window.location.host;
        const protocol = window.location.protocol;
        
        const response = await fetch(`${protocol}//${host}${route}`);
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
