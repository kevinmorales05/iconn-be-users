const { response, request } = require('express');
const TermsConditions = require('../models/termsConditions');
const {validationResult} = require('express-validator');

const getTermsConditions = async (req = request, res = response) => {
        const termsConditions = await TermsConditions.findAll({
            limit: 1,
            where: {
              status: true
            },
            order: [ [ 'updatedat', 'DESC' ], [ 'createdat', 'DESC' ]]
        });
        if(termsConditions) {
            res.status(200).json({
                status: "ok",
                msg: "Get one termsConditions",
                termsConditions
            })
        }
        else {
            res.status(404).json({
                msg: `TermsConditions not found!`
            })
        }
}

/*
const getTermsOfUse = async (req = request, res = response) => {
    const { id } = req.params;
        const termsConditions = await TermsConditions.findByPk(id);
        if(termsConditions) {
            res.status(200).json({
                status: "ok",
                msg: "Get one termsConditions",
                termsConditions
            })
        }
        else {
            res.status(404).json({
                msg: `TermsConditions not found, the termsConditions with the id ${id} is not registered!`
            })
        }
}

const getNoticePrivacy = async (req = request, res = response) => {
    const { id } = req.params;
        const termsConditions = await TermsConditions.findByPk(id);
        if(termsConditions) {
            res.status(200).json({
                status: "ok",
                msg: "Get one termsConditions",
                termsConditions
            })
        }
        else {
            res.status(404).json({
                msg: `TermsConditions not found, the termsConditions with the id ${id} is not registered!`
            })
        }
}

const postTermsConditions = async (req = request, res = response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {

        const termsConditions = new TermsConditions(bodyReq);
        await termsConditions.save();
        res.json({
            status: "ok",
            msg: "TermsConditions created successfully!",
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        }
        )
    }
}
*/

const putTermsConditions = (req, res) => {
    res.json({
        status: "ok",
        msg: "put termsConditions controller"
    })
}

const deleteTermsConditions = (req, res) => {
    res.json({
        status: "ok",
        msg: "delete controller"
    })
}

module.exports = {
    getTermsConditions,
    putTermsConditions,
    deleteTermsConditions,
};