import { FormikErrors, FormikTouched, getIn } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCopy,
  faEdit,
  faFileDownload,
  faTimes,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { MemoryObject, MemoryImages } from "@Shared/types";
import { getFileUrl } from "./firebase";

export const importIcons = () => {
  library.add(faEdit, faTimes, faCheck, faTrash, faCopy, faFileDownload);
};

export const errorIn = (
  errors: FormikErrors<any>,
  touched: FormikTouched<any>,
  value: string
) => getIn(errors, value) !== undefined && getIn(touched, value);

/**
 * For every memory, fetch a URL for each image that can be used to display it.
 * @param memories MemoryObject containing all id-mapped memories to fetch image URLs for
 * @returns MemoryImages, with each memory id mapping to an array of image URLs
 */
export const getMemoriesImages = async (
  memories: MemoryObject
): Promise<MemoryImages> => {
  const memoryImages: MemoryImages = {};
  const keys = Object.keys(memories);

  // Nested Promise.all because forEach does not await async operations
  await Promise.all(
    // For each memory, get the image URLs for each image ID
    keys.map(async (memoryId) => {
      const { images } = memories[memoryId];

      if (images?.length) {
        const imageUrls: string[] = await Promise.all(
          images?.map(async (imageId) => getFileUrl(imageId))
        );
        memoryImages[memoryId] = imageUrls;
      }
    })
  );

  return memoryImages;
};
