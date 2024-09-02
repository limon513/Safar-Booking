class Crud{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            return await this.model.create(data);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Crud;