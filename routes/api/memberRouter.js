const express = require('express');
const router = express.Router();
const uuid = require('uuid');
// members datas
const members = require('../../datas/members');

// Gets All Members
router.get('/', (req, res, next) => res.json(members));

//Get Single Member
router.get('/:id', (req, res, next) => {
    const found = members.some(member => member.id == req.params.id);
    const notFoundError = {
        msg: 'No member with the following id: '
    }
    if (found) {
        const member = members.filter(member => member.id == req.params.id)[0]
        res.render('member', {member});
    } else {
        res.contentType('.html');
        res.status(400).send(`<h1>${notFoundError.msg}${req.params.id} .</h1>`)
    }
})

// Create member
router.post('/', (req, res, next) => {
    const nameOrEmailNotFoundMessage = {
        msg: 'Please include a name and email'
    }
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json(nameOrEmailNotFoundMessage.msg)
    }
    members.push(newMember);
    res.status(201).redirect('/');
});

// Update Member
router.put('/:id', (req, res, next) => {
    const found = members.some(member => member.id == req.params.id);
    const notFoundError = {
        msg: 'No member with the following id: '
    }

    if (found) {
        const updateMember = req.body
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                const updateSuccessMessage = {
                    msg: `Member updated !`,
                    member: member
                }

                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.status(202).redirect('/');
            }
        })
        res.json(members.filter(member => member.id == req.params.id)[0]);
    } else {
        res.status(400).json(`${notFoundError.msg}${req.params.id} ...`)
    }
})

// Delete Member
router.delete('/:id', (req, res, next) => {
    const found = members.some(member => member.id == req.params.id);
    const notFoundError = { msg: `No member with the following id: ${req.params.id}` }
    if (found) {

        newMembers = members.filter(member => member.id !== parseInt(req.params.id))
        
        res.json({ msg: 'Member deleted !', members: newMembers })

    } else {
        res.status(400).json(`${notFoundError.msg}${req.params.id} ...`)
    }
})

module.exports = router