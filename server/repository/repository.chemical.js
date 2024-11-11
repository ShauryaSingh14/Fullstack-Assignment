const { UPDATE } = require('sequelize/lib/query-types');
const { Chemical } = require('../models/model.chemical.js');
const db = require('../models/index.js');
console.log(db);
const ChemicalMasterRepo = db.Chemical;

// Create a new chemical record
const createChemical = async (params) => {
    try {
        const chemical = await ChemicalMasterRepo.create(params);
        return chemical;
    } catch (error) {
        console.error("Error creating chemical:", error);
        throw error; 
    }
};

// Bulk create or update chemicals from CSV data
const createChemicalCsv = async (params) => {
    try {
        const chemical = await ChemicalMasterRepo.bulkCreate(params, {
            updateOnDuplicate: ["chemical_name", "chemical_image", "chemical_image_attribution", "chemical_description"]
        });
        return chemical;
    } catch (error) {
        console.error("Error creating chemical through csv:", error);
        throw error; 
    }
};

// Find a chemical by ID
const findChemicalsById = async (id) => {
    const chemical = await ChemicalMasterRepo.findOne({
        where: { chemical_id: id }
    });
    return chemical;
};

// Retrieve all chemicals
const findAllChemicals = async () => {
    const chemical = await ChemicalMasterRepo.findAll();
    return chemical;
};

// Update a chemical by ID
const updateChemical = async (id, chemical) => {
    const updatedChemical = await ChemicalMasterRepo.update(chemical, {
        where: { chemical_id: id }
    });
    return updatedChemical;
};

// Delete a chemical by ID
const deleteChemical = async (id) => {
    await ChemicalMasterRepo.destroy({
        where: { chemical_id: id }
    });
};

module.exports = {
    createChemical,
    createChemicalCsv,
    findChemicalsById,
    findAllChemicals,
    updateChemical,
    deleteChemical,
}
