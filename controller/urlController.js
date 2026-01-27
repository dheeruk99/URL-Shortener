const { shortenUrlPostRequestBodySchema } = require('../validations/request.validation');
const { nanoid } = require('nanoid');
const  {generateShortUrl,getUrlByCode,getAllUrlsByUserId,deleteUrlById}  = require('../services/url.Service')

const {z} = require('zod');
const { ca } = require('zod/locales');


const shortenUrl = async function (req, res) {
  try {
    const validationResult =
      await shortenUrlPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: z.treeifyError(validationResult.error) });
    }
    let { shortCode, targetURL } = validationResult.data;
    shortCode = shortCode ?? nanoid(6);

    const userId = req.user.id;

    const urlResponse = await generateShortUrl(shortCode, targetURL, userId);

    if (!urlResponse) {
      return res.status(409).json({ error: `Short URL code already exists` });
    }
    return res.status(200).json({ id: urlResponse.id });
  } catch (err) {
    throw err;
  }
};


const redirectUrl = async function (req, res) {
    try{
      const { urlCode } = req.params;
      const urlResponse = await getUrlByCode(urlCode);
      if(urlResponse.length === 0){
        return res.status(404).json({error: "URL not found"});
      } else {
        return res.status(200).json({targetURL: urlResponse[0].targetURL});
      }
    }catch(err){
      throw err;
    }
}

const getAllShortenedUrls = async function (req, res) {
  try {
    const userId = req.user.id;
    const urls = await getAllUrlsByUserId(userId);
    return res.status(200).json({ urls: urls });
  } catch (err) {
    throw err;
  }
};

const deleteShortenedUrl = async function (req, res) {
  try {
    const { urlId } = req.params;
    const userId =  req.user.id;
    const deleteResponse = await deleteUrlById(urlId, userId);
    if (deleteResponse.length === 0) {
      return res
        .status(404)
        .json({ error: "URL not found or not authorized to delete" });
    } else {
      return res.status(200).json({ message: "URL deleted successfully" });
    }
  } catch (err) {
     throw err;
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
  getAllShortenedUrls,
  deleteShortenedUrl
};
