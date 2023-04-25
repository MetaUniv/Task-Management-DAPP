const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Manager", function () {
  let Manager, manager;

  before(async function () {
    Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
    await manager.deployed();
  });

    it("Should create a new Ticket", async function () {
      await manager.createTicket("MetaUniv");
      let tickets = await manager.getTickets();
      expect(tickets[0].name).to.equal("MetaUniv");
    });

    it("Should Update Ticket Name", async function () {
        await manager.updateTicketName(0, "New MetaUniv");
        let tickets = await manager.getTickets();
        expect(tickets[0].name).to.equal("New MetaUniv");
      });

      it("Should Update Ticket Status", async function () {
        await manager.updateTicketStatus(0, 3);
        let tickets = await manager.getTickets();
        expect(tickets[0].status).to.equal(3);
      });

      it("Should return list of tickets", async function () {
        await manager.createTicket("New Ticket");
        await manager.createTicket("New Ticket");
        await manager.createTicket("New Ticket");
        let tickets = await manager.getTickets();
        expect(tickets.length).to.equal(4);
      });

    });
