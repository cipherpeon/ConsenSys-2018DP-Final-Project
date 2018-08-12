var exports = module.exports = {};

exports.expectThrow = async function(promise) {
    try {
      await promise;
    } catch (error) {
      const revert = error.message.search('revert') >= 1;
      const invalidOpcode = error.message.search('invalid opcode') >= 0;
      const outOfGas = error.message.search('out of gas') >= 0;
      assert(
        invalidOpcode || outOfGas || revert,
        'Expected throw, got \'' + error + '\' instead',
      );
      return;
    }
    assert.fail('Expected throw not received');
  };
