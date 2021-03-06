'use strict';

    describe("formatTags", function(){
        it("should get a barcodes", function(){
            let tags = [
                'ITEM000001',
                'ITEM000001',
                'ITEM000001',
                'ITEM000001',
                'ITEM000001',
                'ITEM000003-2.5',
                'ITEM000005',
                'ITEM000005-2',
            ];

            let answer = formatTags(tags);
            let result = [
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000003", amount: 2.5},
                {barcode: "ITEM000005", amount: 1},
                {barcode: "ITEM000005", amount: 2}
            ];

            expect(answer).toEqual(result);
        });
    });

    describe("mergeBarcodes", function(){
        it("should get items with merged amount", function(){
            let input = [
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000001", amount: 1},
                {barcode: "ITEM000003", amount: 2.5},
                {barcode: "ITEM000005", amount: 1},
                {barcode: "ITEM000005", amount: 2}
            ];

            let output = mergeBarcodes(input);
            let result = [
                {barcode: "ITEM000001", amount: 5},
                {barcode: "ITEM000003", amount: 2.5},
                {barcode: "ITEM000005", amount: 3},
            ];
            expect(output).toEqual(result);
        });
    });

    describe("getCartItems", function(){
        it("should return items with information", function(){
            let input = [
                {barcode: "ITEM000001", amount: 5},
                {barcode: "ITEM000003", amount: 2.5},
                {barcode: "ITEM000005", amount: 3},
            ];
            let allItems = [
                {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00
                },
                {
                    barcode: 'ITEM000002',
                    name: '苹果',
                    unit: '斤',
                    price: 5.50
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00
                },
                {
                    barcode: 'ITEM000004',
                    name: '电池',
                    unit: '个',
                    price: 2.00
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                }
            ];
            let output = getCartItems(input, allItems);
            let result = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3
                }
        ];
            expect(output).toEqual(result);
        });
    });

    describe("getSubTotalItems", function(){
        it("should return items with subtotal", function(){
            let input = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3
                }
            ];
            let output = getSubTotalItems(input);
            let result = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5,
                    subTotal: 15
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5,
                    subTotal: 37.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3,
                    subTotal: 13.5
                }
            ];
            expect(output).toEqual(result);
        });
    });
    describe("getTotal", function(){
        it("should print not discounted total", function(){
            let input = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5,
                    subTotal: 15
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5,
                    subTotal: 37.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3,
                    subTotal: 13.5
                }
            ];
            let output = getTotal(input);
            expect(output).toEqual(66);
        })
    })

    describe("getDiscountItems", function(){
        it("should print items with discounted subtotal", function(){
            let input = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5,
                    subTotal: 15
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5,
                    subTotal: 37.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3,
                    subTotal: 13.5
                }
            ];
            let promotionsItems = [
                {
                    type: 'BUY_TWO_GET_ONE_FREE',
                    barcodes: [
                        'ITEM000000',
                        'ITEM000001',
                        'ITEM000005'
                    ]
                }
            ];
            let output = getDiscountItems(input, promotionsItems);
            let result = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5,
                    subTotal: 15,
                    discountSubTotal: 12
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5,
                    subTotal: 37.5,
                    discountSubTotal: 37.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3,
                    subTotal: 13.5,
                    discountSubTotal: 9
                }
            ];
            expect(output).toEqual(result);
        })
    })

    describe("getdiscountTotal", function(){
        it("should get discounted total", function(){
            let input = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5,
                    subTotal: 15,
                    discountSubTotal: 12
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5,
                    subTotal: 37.5,
                    discountSubTotal: 37.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3,
                    subTotal: 13.5,
                    discountSubTotal: 9
                }
            ];;
            let output = getDiscountTotal(input);
            let result = 58.5;
            expect(output).toEqual(result);
        })
    })

    describe("getSaveMoney", function(){
        it("should print savemoney", function(){
            let input = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5,
                    subTotal: 15,
                    discountSubTotal: 12
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5,
                    subTotal: 37.5,
                    discountSubTotal: 37.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3,
                    subTotal: 13.5,
                    discountSubTotal: 9
                }
            ];
            let total = 66;
            let discountTotal = 58.5;
            let output = getSaveMoney(total, discountTotal);
            expect(output).toEqual(7.5);
        })
    })

    describe("printReceipt", function(){
        it("should print receipts", function(){
            let inputOne = [
                {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 5,
                    subTotal: 15,
                    discountSubTotal: 12
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2.5,
                    subTotal: 37.5,
                    discountSubTotal: 37.5
                },
                {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50,
                    amount: 3,
                    subTotal: 13.5,
                    discountSubTotal: 9
                }
            ];
            spyOn(console, "log");
            let inputTwo = 58.5;
            let inputThree = 7.5;
            print(inputOne, inputTwo, inputThree);
            let result = "\n******<没钱赚商店>收据******" + "\n" +
            "名称:雪碧, 数量:5, 单价:3(元), 小计:12(元)" + "\n" +
            "名称:荔枝, 数量:2.5, 单价:15(元), 小计:37.5(元)" + "\n" +
            "名称:方便面, 数量:3, 单价:4.5(元), 小计:9(元)" + "\n" +
            "----------------------------" + "\n" +
            "总计:58.5(元)" + "\n" +
            "节省:7.5(元)" + "\n" +
            "*************";
            expect(console.log).toHaveBeenCalledWith(result);
        });
    });















