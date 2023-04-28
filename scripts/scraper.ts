import { PGEssay } from "@/types";
import axios from "axios"; // Handle HTTP Request
import * as cheerio from "cheerio"; // Parse HTML
import { encode } from "gpt-3-encoder"; 

const BASE_URL = "http://www.paulgraham.com";

const getLinks = async () => {
    const html = await axios.get(`${BASE_URL}/articles.html`);
    const $ = cheerio.load(html.data);  
    
    const tables = $("table");

    const linkArr: { url: string, title: string }[] = [];

    tables.each((i, table) => {
        if (i === 2) {
            const links = $(table).find("a");

            links.each((i, link) => {

            const url = $(link).attr("href");
            const title = $(link).text();

            if (url && url.endsWith(".html")) {
                const linkObj = {
                    url,
                    title
                }

                linkArr.push(linkObj);
            }
        });
        }
    });

    return linkArr;
}


const getEssay = async (url: string, title: string ) => {
    let essay: PGEssay = {
        title: "",
        url: "",
        date: "",
        content: "",
        tokens: 0,
        chunks: []
    }
    
    const html = await axios.get(`${BASE_URL}/${url}`);
    const $ = cheerio.load(html.data);
    const tables = $("table");

    const text = $("tables").text();

    let cleannedText = text.replace(/\s+/g, " ").replace(/\.([a-zA-Z])/g, ". $1");

    tables.each((i, table) => {
        if (i === 1) {
            const text = $(tables).text();
        }
    });
}


(async () => {
    const links = await getLinks();
    console.log(links);
})();

