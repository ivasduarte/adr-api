import test from 'node:test';
import assert from 'node:assert';
import { Adr } from '../../src/domain/Adr.js';

test("New ADR begins as PROPOSED", () => {
    const adr = new Adr('1', 'Hexagonal Architecture', 'Details...', 'component A');
    assert.strictEqual(adr.status, 'PROPOSED');
});

test("Failure creating new ADR with missing title", () => {
    assert.throws(() => new Adr('2', null, '', ''), /mandatory/);
});

test("ADR must switch to ACCEPTED", () => {
    const adr = new Adr('3', 'PlantUML Use', 'Details...', 'component B');
    adr.approve();
    assert.strictEqual(adr.status, 'ACCEPTED');
})