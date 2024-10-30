import http from "./http";

export const getTabs = async () => {
    try {
        const response = await http.get('tabs/');
        return response.data;
    } catch (error) {
        console.log("Failed to fetch cards:", error);
    }
};

export const createTab = async (tab) => {
    try {
        const response = await http.post('/tabs', tab);
        return response.data;
    } catch (error) {
        console.log("Failed to create tab:", error);
    }
};

export const updateTab = async (id, updatedData) => {
    try {
        const response = await http.patch(`/tabs/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.log(`Failed to update tab with id ${id}:`, error);
    }
};

export const deleteTab = async (id) => {
    try {
        const response = await http.delete(`/tabs/${id}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to delete tab with id ${id}:`, error);
    }
};