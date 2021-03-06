describe('The product-list component', function () {
    'use strict';

    var component;
    var controller;
    var i;

    beforeEach(function () {
        module('fedramp', 'fedramp.components');
        inject(function (_$componentController_, $injector) {
            i = 0;
            controller = _$componentController_;
            var Data = $injector.get('Data');
            var StorageData = $injector.get('StorageData');
            var data = new Data({
                'Cloud_Service_Provider_Name': 'test',
                'Cloud_Service_Provider_Package': 'Content Delivery Services',
                'Designation': 'Compliant',
                'Service_Model': [
                    'IaaS'
                ],
                'Deployment_Model': 'Community Cloud',
                'Impact_Level': 'Moderate',
                'Sponsoring_Agency': 'Department of Health and Human Services',
                'Leveraged_ATO_Letters': [
                    {
                        'Letter_Date': '2014-02-24T05:00:00.000Z',
                        'Letter_Expiration_Date': '2017-02-24T05:00:00.000Z',
                        'Authorizing_Letter_Last_Sign_Date': '2017-02-24T05:00:00.000Z',
                        'Authorizing_Agency': 'Department of Health and Human Services',
                        'Authorizing_Subagency': 'Department of Health and Human Services',
                        'Active': 'Active'
                    }
                ]
            });

            var storage = new StorageData();
            storage.clear();
            storage.update(data.hash(), data);
            component = controller('productList', {
                fedrampData: storage
            }, {
                products: ['Google', 'Content Delivery Services']
            });
        });
    });

    it('it stores onCloseBoth', function () {
        expect(component.$onInit).not.toThrow();
        expect(component.products).toBeDefined();
    });

    it('it finds a product by name', function () {
        var notFound = component.findProductByName('blah');
        expect(notFound).toBeUndefined();

        var cso = 'Content Delivery Services';
        var found = component.findProductByName(cso);
        expect(found).not.toBeNull();
        expect(found.name).toBe(cso);

    });

    it('it can sort product keys', function () {
        var data = ['Google', 'Amazon', 'Amazon', 'Akamai'];
        expect(data[0]).toBe('Google');
        data.sort(component.sortProductKeys);
        expect(data[0]).toBe('Akamai');

        data = ['amazon', 'google'];
        data.sort(component.sortProductKeys);
        expect(data[0]).toBe('amazon');
    });
});
