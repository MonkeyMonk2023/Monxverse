import React from "react";

const Profile = () => {
  return (
    <div id="app-layout" class="overflow-x-hidden flex">
      <div
        id="app-layout-content"
        class="min-h-screen w-full min-w-[100vw] md:min-w-0 [transition:margin_0.25s_ease-out]"
      >
        <div class="p-6">
          <div class="flex items-center mb-4 border-b border-gray-300 pb-4">
            <h1 class="inline-block text-xl font-semibold leading-6">
              General
            </h1>
          </div>

          <div class="mb-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="mb-lg-0 col-span-1">
              <h4 class="mb-1">General Setting</h4>
              <p class="text-gray-600">Profile configuration settings</p>
            </div>
            <div class="card shadow col-span-3">
              <div class="card-body">
                <div class="mb-6">
                  <h4 class="mb-1">General Settings</h4>
                </div>
                <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                  <div class="flex-1 text-gray-800 font-semibold">
                    <h5 class="mb-0">Avatar</h5>
                  </div>
                  <div class="flex-[3]">
                    <div class="flex items-center">
                      <div class="me-3">
                        <img
                          src="assets/images/avatar/avatar-5.jpg"
                          class="rounded-full w-16 h-16"
                          alt=""
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          class="btn gap-x-2 bg-white text-gray-800 border-gray-300 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          class="btn gap-x-2 bg-white text-gray-800 border-gray-300 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="mb-6">
                    <h4 class="mb-1">Basic information</h4>
                  </div>
                  <form>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="fullName"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Full name
                      </label>
                      <div class="flex-[3] w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="text"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="First name"
                          id="fullName"
                          required=""
                        />

                        <input
                          type="text"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Last name"
                          id="lastName"
                          required=""
                        />
                      </div>
                    </div>

                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="email"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Email
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="email"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Email"
                          id="email"
                          required=""
                        />
                      </div>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="phone"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Phone
                        <span>(Optional)</span>
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="text"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Phone"
                          id="phone"
                          required=""
                        />
                      </div>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="addressLine"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Address
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="text"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="placeholder"
                          id="addressLine"
                          required=""
                        />
                      </div>
                    </div>

                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="twitter"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Twitter
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="text"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3"
                          placeholder="Enter Twitter URL"
                          id="twitter"
                        />
                      </div>
                    </div>

                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="instagram"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Instagram
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="text"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3"
                          placeholder="Enter Instagram URL"
                          id="instagram"
                        />
                      </div>
                    </div>

                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="facebook"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Facebook
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="text"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3"
                          placeholder="Enter Facebook URL"
                          id="facebook"
                        />
                      </div>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <div class="flex-1 text-gray-800 font-semibold"></div>
                      <div class="flex-[3]">
                        <button
                          type="submit"
                          class="btn bg-primary-400 text-white border-primary-600 hover:bg-primary-500 hover:border-primary-700 active:bg-primary-800 active:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="col-span-1">
              <h4 class="mb-1">Email Setting</h4>
              <p class="text-gray-600">Add an email settings to profile</p>
            </div>
            <div class="card shadow col-span-3">
              <div class="card-body">
                <div class="mb-6">
                  <h4 class="mb-1">Email</h4>
                </div>
                <div>
                  <form>
                    <div class="mb-3 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="newEmail"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        New Email
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="email"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Enter your email Address"
                          id="newEmail"
                          required=""
                        />
                      </div>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <div class="flex-1 text-gray-800 font-semibold"></div>
                      <div class="flex-[3]">
                        <button
                          type="submit"
                          class="btn bg-primary-400 text-white border-primary-600 hover:bg-primary-500 hover:border-primary-700 active:bg-primary-800 active:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                    <div class="mb-6">
                      <h4 class="mb-1">Change your password</h4>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="password"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Current password
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="password"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Enter Current Password"
                          id="password"
                          required=""
                        />
                      </div>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="newPassword"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        New password
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="password"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Enter New Password"
                          id="newPassword"
                          required=""
                        />
                      </div>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <label
                        for="confirmedPassword"
                        class="flex-1 text-gray-800 font-semibold"
                      >
                        Confirm new password
                      </label>
                      <div class="flex-[3] w-full">
                        <input
                          type="password"
                          class="border border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 px-3 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Confirm new password"
                          id="confirmedPassword"
                          required=""
                        />
                      </div>
                    </div>
                    <div class="mb-6 inline-flex md:flex md:items-center gap-3 flex-col md:flex-row w-full">
                      <div class="flex-1 text-gray-800 font-semibold"></div>
                      <div class="flex-[3]">
                        <div>
                          <h5 class="mb-1">Password requirements:</h5>
                          <p>Ensure that these requirements are met:</p>
                          <ul class="list-disc list-inside my-4">
                            <li>
                              Minimum 8 characters long the more, the better
                            </li>
                            <li>At least one lowercase character</li>
                            <li>At least one uppercase character</li>
                            <li>
                              At least one number, symbol, or whitespace
                              character
                            </li>
                          </ul>
                        </div>
                        <button
                          type="submit"
                          class="btn bg-primary-400 text-white border-primary-600 hover:bg-primary-500 hover:border-primary-700 active:bg-primary-800 active:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="col-span-1">
              <h4 class="mb-1">Delete Account</h4>
              <p class="text-gray-600">Easily set up social media accounts</p>
            </div>
            <div class="card shadow col-span-3">
              <div class="card-body">
                <h4 class="mb-1">Danger Zone</h4>
                <p class="mb-4">
                  Delete any and all content you have, such as articles,
                  comments, your reading list or chat messages. Allow your
                  username to become available to anyone.
                </p>
                <button
                  type="submit"
                  class="btn bg-primary-400 text-white border-primary-600 hover:bg-primary-500 hover:border-primary-700 active:bg-primary-800 active:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
