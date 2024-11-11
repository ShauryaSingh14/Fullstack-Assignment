const csv = require('csvtojson'); // Import csvtojson for parsing CSV files
const csvPath = "./utils/chemical_data.csv";
const { 
    createChemical, 
    createChemicalCsv, 
    findChemicalsById, 
    findAllChemicals, 
    updateChemical, 
    deleteChemical, 
    createorUpdate 
} = require('../repository/repository.chemical.js');

// Fetch all chemicals
const getChemicals = async (req, res) => {
    try {
        const chemicals = await findAllChemicals();
        return res.status(200).json(chemicals);
    } catch (err) {
        console.log(err);
    }
}

// Fetch a specific chemical by ID
const getChemicalsById = async (req, res) => {
    try {
        const chemical = await findChemicalsById(req.params.id);
        return res.status(200).json(chemical);
    } catch (err) {
        console.log(err);
    }
}

// Create a new chemical entry
const createChemicals = async (req, res) => {
    try {
        const chemical = await createChemical(req.body);
        return res.status(200).json(chemical);
    } catch (err) {
        console.log(err);
    }
}

// Insert multiple chemicals from CSV file
const createChemicalsCsv = async (req, res) => {
    try {
        const chemicalsToBeInserted = await csv().fromFile(csvPath);
        const chemicals = chemicalsToBeInserted.map(item => ({
            chemical_name: item.CompoundName,
            chemical_description: item.CompoundDescription,
            chemical_image: item.strImageSource,
            chemical_image_attribution: item.strImageAttribution,
            chemical_id: item.id
        }));
        
        await createChemicalCsv(chemicals);
        return res.status(200).json({ message: 'Chemicals Added Successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Update an existing chemical by ID
const updateChemicals = async (req, res) => {
    try {
        const chemical = await updateChemical(req.params.id, req.body);
        return res.status(200).json(chemical);
    } catch (err) {
        console.log(err);
    }
}

// Delete a chemical by ID
const deleteChemicals = async (req, res) => {
    try {
        await deleteChemical(req.params.id);
        return res.status(200).json('Chemical has been deleted successfully!');
    } catch (err) {
        console.log(err);
    }
} 

// Export controller functions
module.exports = {
    getChemicals,
    getChemicalsById,
    createChemicals,
    createChemicalsCsv,
    updateChemicals,
    deleteChemicals,
}
