const tcStringparse = (consentString) => {
  let decodeBinary = (tcString) => {
    let result = '';
    for (let index = 0, length = tcString.length; index < length; index += 1) {
      let bits = tcString.charCodeAt(index).toString(2);
      let pad = '00000000'.slice(0, 8 - bits.length);
      result += pad + bits;
    }
    return result;
  };

  let decodeBase64 = (tcString) => {
    if (typeof atob === 'function') {
      let stringFixed = tcString.
        replace(/_/g, '/').
        replace(/-/g, '+');
      try {
        return atob(stringFixed);
      } catch (error) {
        throw new Error('Unable to decode transparency and consent string');
      }
    }
    if (typeof Buffer === 'function') {
      return Buffer.from(tcString, 'base64').toString('binary');
    }

    throw new Error('Unable to detect base64 decoder');
  };
  let decodeInt = (bits) => {
    return parseInt(bits, 2) || 0;
  };

  let decodeDate = (bits) => {
    return decodeInt(bits) * 100;
  };

  let decodeString = (bits) => {
    let charOffset = 'A'.charCodeAt();
    let items = bits.match(/.{6}/g) || [];
    let result = '';

    for (let index = 0, length = items.length; index < length; index += 1) {
      let charCode = decodeInt(items[index]) + charOffset;
      result += String.fromCharCode(charCode);
    }

    return result;
  };

  let decodeBoolean = (bit) => {
    return Boolean(Number(bit));
  };

  let decodeFlags = (bits) => {
    let items = bits.split('');
    let result = {};
    for (let index = 0, length = items.length; index < length; index += 1) {
      if (decodeBoolean(items[index])) {
        result[index + 1] = true;
      }
    }
    return result;
  };

  let objectAssign = function (target) {
    let to = Object(target);

    for (let index = 1; index < arguments.length; index += 1) {
      let nextSource = arguments[index];

      if (nextSource !== null) {
        for (let nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }

    return to;
  };

  let applySchemaValue = (schema, value, result) => {
    if (schema.key && !schema.hidden) {
      if (schema.parent) {
        if (!result[schema.parent]) {
          result[schema.parent] = {};
        }

        if (typeof result[schema.parent][schema.key] === 'object' && typeof value === 'object') {
          result[schema.parent][schema.key] = objectAssign(result[schema.parent][schema.key], value);
        } else {
          result[schema.parent][schema.key] = value;
        }
      } else if (typeof result[schema.key] === 'object' && value === 'object') {
        result[schema.key] = objectAssign(result[schema.key], value);
      } else {
        result[schema.key] = value;
      }
    }

    return result;
  };

  let getSegments = (tcString) => {
    if (typeof tcString !== 'string') {
      throw new Error('Invalid transparency and consent string specified');
    }

    let stringBlocks = tcString.split('.');
    let result = [];

    for (let index = 0, length = stringBlocks.length; index < length; index += 1) {
      result.push(decodeBinary(decodeBase64(stringBlocks[index])));
    }

    let version = decodeInt(result[0].slice(0, 6));
    if (version !== 2) {
      throw new Error('Unsupported transparency and consent string version “' + version + '”');
    }

    return result;
  };

  let getQueue = (segments) => {
    let queuePurposes = [{
      key: 'consents',
      size: 24,
      decoder: decodeFlags
    }, {
      key: 'legitimateInterests',
      size: 24,
      decoder: decodeFlags
    }];

    let queueVendors = [{
      key: 'maxVendorId',
      size: 16
    }, {
      key: 'isRangeEncoding',
      size: 1,
      decoder: decodeBoolean
    }];

    let queueCore = [{
      key: 'version',
      size: 6
    }, {
      key: 'created',
      size: 36,
      decoder: decodeDate
    }, {
      key: 'lastUpdated',
      size: 36,
      decoder: decodeDate
    }, {
      key: 'cmpId',
      size: 12
    }, {
      key: 'cmpVersion',
      size: 12
    }, {
      key: 'consentScreen',
      size: 6
    }, {
      key: 'consentLanguage',
      size: 12,
      decoder: decodeString
    }, {
      key: 'vendorListVersion',
      size: 12
    }, {
      key: 'tcfPolicyVersion',
      size: 6
    }, {
      key: 'isServiceSpecific',
      size: 1,
      decoder: decodeBoolean
    }, {
      key: 'useNonStandardStacks',
      size: 1,
      decoder: decodeBoolean
    }, {
      key: 'specialFeatureOptins',
      size: 12,
      decoder: decodeFlags
    }].concat(queuePurposes.map((segment) => {
      return objectAssign({ parent: 'purpose' }, segment);
    })).concat({
      key: 'purposeOneTreatment',
      size: 1,
      decoder: decodeBoolean
    }, {
      key: 'publisherCC',
      size: 12,
      decoder: decodeString
    }, {
      key: 'consents',
      parent: 'vendor',
      queue: [{
        key: 'maxVendorId',
        size: 16
      }, {
        key: 'isRangeEncoding',
        size: 1,
        decoder: decodeBoolean
      }]
    }, {
      key: 'legitimateInterests',
      parent: 'vendor',
      queue: queueVendors
    }, {
      key: 'restrictions',
      parent: 'publisher',
      queue: [{
        key: 'numPubRestrictions',
        size: 12
      }]
    });

    let queueSegment = [{
      size: 3
    }];

    let queueDisclosedVendors = [].
      concat(queueSegment).
      concat(queueVendors);

    let queueAllowedVendors = [].
      concat(queueSegment).
      concat(queueVendors);

    let queuePublisher = [].
      concat(queueSegment).
      concat(queuePurposes).
      concat({
        key: 'numCustomPurposes',
        hidden: true,
        size: 6
      });

    let result = [{
      key: 'core',
      queue: queueCore
    }];

    for (let index = 1; index < segments.length; index += 1) {
      let segment = segments[index];

      let type = decodeInt(segment.slice(0, 3));

      if (type === 1) {
        result.push({
          key: 'outOfBand',
          parent: 'core',
          queue: [{
            key: 'disclosedVendors',
            queue: queueDisclosedVendors
          }]
        });
      } else

        if (type === 2) {
          result.push({
            key: 'outOfBand',
            parent: 'core',
            queue: [{
              key: 'allowedVendors',
              queue: queueAllowedVendors
            }]
          });
        } else

          if (type === 3) {
            result.push({
              key: 'publisher',
              parent: 'core',
              queue: queuePublisher
            });
          }
    }

    return result;
  };

  let reduceQueue = (queue, schema, value, result) => {
    let reduceNumPubEntries = () => {
      if (result.pubRestrictionEntry && result.rangeEntry) {
        for (let key in result.rangeEntry) {
          if (Object.prototype.hasOwnProperty.call(result.rangeEntry, key)) {
            result.pubRestrictionEntry[key] = (result.pubRestrictionEntry[key] || []).
              concat(result.rangeEntry[key]);
          }
        }
      }

      if (result.numPubRestrictions) {
        result.numPubRestrictions -= 1;

        queue.push({
          key: 'purposeId',
          size: 6
        }, {
          key: 'restrictionType',
          size: 2
        }, {
          key: 'numEntries',
          size: 12
        });
      }
    };

    let reduceNumEntries = () => {
      if (result.numEntries) {
        result.numEntries -= 1;

        queue.push({
          key: 'isRange',
          size: 1,
          decoder: decodeBoolean
        }, {
          key: 'startVendorId',
          size: 16
        });
      } else {
        reduceNumPubEntries();
      }
    };

    let getRangeResult = () => {
      if (result.purposeId) {
        return [{
          purpose: result.purposeId,
          isAllowed: result.restrictionType !== 0,
          isConsentRequired: result.restrictionType === 1,
          isLegitimateInterestRequired: result.restrictionType === 2
        }];
      }

      return true;
    };

    if (schema.key === 'isRangeEncoding') {
      queue.push(value ? {
        key: 'numEntries',
        size: 12
      } : {
        key: 'bitField',
        size: result.maxVendorId,
        decoder: decodeFlags
      });
    } else

      if (schema.key === 'numEntries') {
        result.rangeEntry = {};
        reduceNumEntries();
      } else

        if (schema.key === 'isRange') {
          if (value) {
            queue.push({
              key: 'endVendorId',
              size: 16
            });
          }
        } else

          if (schema.key === 'startVendorId') {
            if (!result.isRange) {
              result.rangeEntry[value] = getRangeResult();
              reduceNumEntries();
            }
          } else

            if (schema.key === 'endVendorId') {
              for (let vendorId = result.startVendorId; vendorId <= result.endVendorId; vendorId += 1) {
                result.rangeEntry[vendorId] = getRangeResult();
              }
              reduceNumEntries();
            } else

              if (schema.key === 'numCustomPurposes') {
                queue.push({
                  key: 'consents',
                  parent: 'customPurpose',
                  size: result.numCustomPurposes,
                  decoder: decodeFlags
                }, {
                  key: 'legitimateInterests',
                  parent: 'customPurpose',
                  size: result.numCustomPurposes,
                  decoder: decodeFlags
                });
              } else

                if (schema.key === 'numPubRestrictions') {
                  result.pubRestrictionEntry = {};
                  reduceNumPubEntries();
                }
  };

  let reduceResult = (result) => {
    return result.pubRestrictionEntry || result.rangeEntry || result.bitField || result;
  };

  let offset = 0;

  let getSchemaResult = (schema, bits) => {
    let value = bits.slice(offset, offset + schema.size);
    offset += schema.size;
    return (schema.decoder || decodeInt)(value);
  };

  let getSectionResult = (sectionSchema, bits) => {
    if (!sectionSchema.queue) {
      return getSchemaResult(sectionSchema, bits);
    }

    let result = {};

    for (let index = 0; index < sectionSchema.queue.length; index += 1) {
      let schema = sectionSchema.queue[index];

      let value = getSchemaResult(schema, bits);
      result = applySchemaValue(schema, value, result);
      reduceQueue(sectionSchema.queue, schema, value, result);
    }

    return reduceResult(result);
  };

  let getBlockResult = (blockSchema, bits) => {
    let result = {};

    for (let index = 0; index < blockSchema.queue.length; index += 1) {
      let schema = blockSchema.queue[index];

      let value = getSectionResult(schema, bits);
      result = applySchemaValue(schema, value, result);
      reduceQueue(blockSchema.queue, schema, value, result);
    }

    return reduceResult(result);
  };

  let getResult = () => {
    let segments = getSegments(consentString);
    let queue = getQueue(segments);

    let result = {};

    for (let index = 0; index < queue.length; index += 1) {
      let schema = queue[index];
      let bits = segments[index];

      let value = getBlockResult(schema, bits);
      result = applySchemaValue(schema, value, result);
      offset = 0;
    }

    return objectAssign({
      tcString: consentString,
      vendor: {},
      outOfBand: {
        disclosedVendors: {},
        allowedVendors: {}
      }
    }, result.core);
  };

  return getResult();

}

export default tcStringparse;