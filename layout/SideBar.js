import React from "react";
import { HiTemplate } from "react-icons/hi";
// import { FiUsers } from 'react-icons/fi'
// import { MdAccountCircle, MdPayment } from 'react-icons/md'
import { AiOutlineClose } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import { sideBarLinks } from "@/helper/sideBarLinks";
import DropDown from "@/components/DropDown";

const SideBar = ({ sidebar, setToggle, toggle }) => {
    const { locale, pathname, query, asPath, locales, push } = useRouter();

    const router = useRouter();

    return (
        <>
            <div div className="sidebar relative ">
                <div className="logo">
                    <Image src="/logo.png" alt="logo" width={180} height={40} />
                </div>
                <div
                    className="block md:hidden absolute top-4 right-4 cursor-pointer"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    <AiOutlineClose color="#000" />
                </div>
                <div className="menu-items">
                    <ul>
                        <li
                            className={pathname === "/" ? "active" : ""}
                            // onClick={() => setToggle((prev) => !prev)}
                        >
                            <Link href={"/"}>
                                <span>
                                    {" "}
                                    <HiTemplate className="icon" />{" "}
                                </span>
                                <span>Home</span>
                            </Link>
                        </li>

                        {sideBarLinks.map((link, index) => (
                            <li
                                key={index}
                                className={
                                    pathname === link.path ? "active" : ""
                                }
                                // onClick={() => setToggle((prev) => !prev)}
                            >
                                <Link href={link.path}>
                                    <span>{link.icon}</span>
                                    <span>{link.title}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <DropDown />
                        </li>
                    </ul>
                </div>
                <div className="logout">
                    <Button
                        width={"220px"}
                        height={"45px"}
                        border={"none"}
                        bg={"#cdeefe"}
                        color={"#00537b"}
                        radius={"8px"}
                        fontSize={"16px"}
                        fontWeight={"bold"}
                        cursor={"pointer"}
                        onClick={() => {
                            signOut({
                                redirect: false,
                                callbackUrl: `${window.location.origin}/signin`,
                            });
                            router.push("/signin");
                        }}
                    >
                        <CgLogOut /> Log out
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SideBar;
