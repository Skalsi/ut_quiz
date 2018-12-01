const proxyquire = require( 'proxyquire' );

describe( 'The ./lib/expandNamespaces function', ()=>{

  it( 'should keep paths without namespaces unchanged', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub()
    } );

    const expected = './somePath';
    const actual   = expandNamespaces( expected );

    expect( actual ).to.equal( expected );

  } );

  it( 'should return path for defined namespace', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub().returns( {
        namespaces: { User: './some/test/path/User' }
      } )
    } );

    const expected = './some/test/path/User/Contact';
    const actual   = expandNamespaces( '<User>/Contact', './' );

    expect( actual ).to.equal( expected );

  } );

  it( 'should return correct relative path for defined namespace', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub().returns( {
        namespaces: { User: './some/test/path/User' }
      } )
    } );

    const expected = '../../../test/path/User/Contact';
    const actual   = expandNamespaces( '<User>/Contact', './some/other/test/path' );

    expect( actual ).to.equal( expected );

  } );

  it( 'should throw error for undefined namespace', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub().returns( {
        namespaces: { User: './some/test/path/User' }
      } )
    } );

    expect( ()=>expandNamespaces( '<Random>/Contact', './' ) ).to.throw( 'namespace <Random> is not defined' );

  } );

} );
