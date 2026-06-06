/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

const Cart = ({ cartItems, cartOpen, setCartOpen }: { cartItems: any[], cartOpen: boolean, setCartOpen: any }) => {
    return (
        <>
            <Drawer
                direction="right"
                open={cartOpen}
                onOpenChange={setCartOpen}
            >
                <DrawerContent
                    className="ml-auto h-screen w-full sm:w-full rounded-none bg-white flex flex-col border-l">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <h2 className="font-semibold text-sm uppercase">
                            Shopping Cart
                        </h2>

                        <DrawerClose asChild>
                            <button
                                className=" text-gray-500 hover:text-black transition "
                            >
                                <X size={20} />
                            </button>
                        </DrawerClose>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto">

                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center px-6">

                                {/* Empty Cart Icon */}
                                <div className="w-36 h-36 flex items-center justify-center">
                                    <FaCartArrowDown
                                        size={90}
                                        className="text-blue-500 opacity-70"
                                    />
                                </div>

                                <h3 className="text-xl
                         font-semibold mt-4">
                                    No items in your cart!
                                </h3>

                                <p className="text-gray-500 text-center mt-2 font-xs">
                                    Looks like you haven&apos;t added anything yet.
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">

                                {cartItems?.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-3 border rounded-lg p-3"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={70}
                                            height={70}
                                            className="rounded-md"
                                        />

                                        <div className="flex-1">
                                            <h4 className="font-medium">
                                                {item.name}
                                            </h4>

                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>

                                            <p className="font-medium text-[#F48721]">
                                                ৳{item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4 bg-white">

                        <div className="flex justify-between mb-4 font-medium text-md">
                            <span>Total</span>
                            <span>৳0.00</span>
                        </div>

                        <button
                            className=" w-full bg-[#F48721] hover:bg-[#de7410]  text-white py-3 rounded-lg font-medium transition"
                        >
                            Checkout
                        </button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Cart;