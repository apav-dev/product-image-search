import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { callGoogleVisionApi, uploadImage } from "../utils/api";
import {
  SelectableStaticFilter,
  Matcher,
  FilterCombinator,
  useSearchActions,
} from "@yext/search-headless-react";

const IMAGE_URL_REGEX = new RegExp(
  "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
  "i"
);

export interface ImageUploadModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ImageUploadModal = ({ isOpen, setIsOpen }: ImageUploadModalProps) => {
  const [urlInput, setUrlInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [localImage, setLocalImage] = useState<File | null>(null);
  const [fileUpload, setFileUpload] = useState(true);
  const [imageTags, setImageTags] = useState<string[]>([]);
  const [waitingForTags, setWaitingForTags] = useState(false);

  const searchActions = useSearchActions();

  useEffect(() => {
    if (imageUrl) {
      callGoogleVisionApi(imageUrl).then((labelAnnotations) => {
        if (labelAnnotations) {
          const tags = labelAnnotations
            ?.filter((tag) => tag.score > 0.9)
            .map((tag) => tag.description);
          setImageTags(tags);
        }
        setWaitingForTags(false);
      });
    }
  }, [imageUrl]);

  useEffect(() => {
    if (localImage) {
      uploadImage(localImage).then((url) => {
        setImageUrl(url);
      });
    }
  }, [localImage]);

  useEffect(() => {
    console.log(imageTags);
  }, [imageTags]);

  const handleUrlInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const handleImageUpload = (files?: FileList) => {
    if (files?.[0] && files[0].type.includes("image")) {
      setLocalImage(files[0]);
    }
  };

  const onSubmitUrl = () => {
    setWaitingForTags(true);
    setImageUrl(urlInput);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      clearImageData();
    }, 500);
  };

  const handleSearch = () => {
    if (imageTags.length > 0) {
      const imageTagFilter: SelectableStaticFilter = {
        displayName: "Image Tags",
        selected: true,
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: imageTags.map((tag) => ({
            fieldId: "c_imageSearchTags",
            kind: "fieldValue",
            value: tag,
            matcher: Matcher.Equals,
          })),
        },
      };
      searchActions.setStaticFilters([imageTagFilter]);
    }
    searchActions.executeVerticalQuery();
    handleModalClose();
  };

  const clearImageData = () => {
    setImageUrl("");
    setUrlInput("");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModalClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Image Search
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Search for products based on an image.
                    </p>
                  </div>
                  {!imageUrl ? (
                    <>
                      <div className="py-4">
                        {fileUpload ? (
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(e?.target.files)
                              }
                            />
                          </div>
                        ) : (
                          <div className="flex w-full items-center">
                            <input
                              type="text"
                              placeholder="Enter a URL"
                              className="input input-bordered w-full max-w-sm"
                              value={urlInput}
                              onChange={handleUrlInputChange}
                            />
                            <button
                              className="btn ml-4 border-neutral bg-neutral-light normal-case"
                              onClick={onSubmitUrl}
                              disabled={!IMAGE_URL_REGEX.test(urlInput)}
                            >
                              Upload
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center">
                        <div className="btn-group">
                          <button
                            className={classNames(
                              "btn bg-neutral-light normal-case",
                              {
                                "btn-active bg-blue-600": fileUpload,
                              }
                            )}
                            onClick={() => setFileUpload(true)}
                          >
                            File Upload
                          </button>
                          <button
                            className={classNames(
                              "btn bg-neutral-light normal-case",
                              {
                                "btn-active bg-blue-600": !fileUpload,
                              }
                            )}
                            onClick={() => setFileUpload(false)}
                          >
                            Enter URL
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center py-4">
                        <img
                          className="h-72 w-56 object-contain"
                          src={imageUrl}
                        />
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="btn btn-link normal-case"
                          onClick={clearImageData}
                        >
                          Cancel
                        </button>
                        {waitingForTags ? (
                          <button className="btn btn-square loading ml-1"></button>
                        ) : (
                          <button
                            className="btn ml-1 border-neutral bg-neutral-light normal-case"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ImageUploadModal;
