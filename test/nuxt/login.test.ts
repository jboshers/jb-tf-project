import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Login from "../app/components/login/Login.vue";

function mountLogin() {
  return mount(Login);
}

describe("Login.vue", () => {
  test("renders core UI: heading, inputs, link, buttons", () => {
    const wrapper = mountLogin();

    // heading
    expect(wrapper.text()).toContain("Sign in");

    // inputs
    const user = wrapper.get("input#username");
    const pass = wrapper.get("input#password");
    expect(user.attributes("autocomplete")).toBe("username");
    expect(pass.attributes("autocomplete")).toBe("current-password");

    // primary submit button
    expect(wrapper.get('button[type="submit"]').text()).toContain("Continue");

    // oauth buttons
    const buttons = wrapper.findAll('button[type="button"]');
    const btnTexts = buttons.map((b) => b.text());
    expect(btnTexts.some((t) => /Google/i.test(t))).toBe(true);
    expect(btnTexts.some((t) => /Apple/i.test(t))).toBe(true);
  });

  test("shows validation errors when submitting empty form", async () => {
    const wrapper = mountLogin();

    await wrapper.get("form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.text()).toContain("Username is required.");
    expect(wrapper.text()).toContain("Password is required.");

    // Should not emit submit on invalid
    expect(wrapper.emitted("submit")).toBeFalsy();
  });

  test("emits submit with username & password when valid", async () => {
    const wrapper = mountLogin();

    await wrapper.get("#username").setValue("jeff");
    await wrapper.get("#password").setValue("hunter2");

    await wrapper.get("form").trigger("submit.prevent");
    await nextTick();

    const emitted = wrapper.emitted("submit");
    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toEqual({ username: "jeff", password: "hunter2" });

    // No error messages
    expect(wrapper.text()).not.toContain("Username is required.");
    expect(wrapper.text()).not.toContain("Password is required.");
  });

  test("password show/hide toggle switches input type and label", async () => {
    const wrapper = mountLogin();

    const pass = wrapper.get("#password");
    const toggle = wrapper
      .findAll('button[type="button"]')
      .find((b) => /Show|Hide/.test(b.text()))!;
    expect(toggle).toBeTruthy();

    // initial type is password
    expect(pass.attributes("type")).toBe("password");
    expect(toggle.text()).toMatch(/Show/i);

    // click to show
    await toggle.trigger("click");
    await nextTick();
    expect(wrapper.get("#password").attributes("type")).toBe("text");
    expect(toggle.text()).toMatch(/Hide/i);

    // click to hide
    await toggle.trigger("click");
    await nextTick();
    expect(wrapper.get("#password").attributes("type")).toBe("password");
    expect(toggle.text()).toMatch(/Show/i);
  });

  test("emits oauth events for Google and Apple buttons", async () => {
    const wrapper = mountLogin();

    const buttons = wrapper.findAll('button[type="button"]');
    const googleBtn = buttons.find((b) => /Google/i.test(b.text()))!;
    const appleBtn = buttons.find((b) => /Apple/i.test(b.text()))!;

    await googleBtn.trigger("click");
    await appleBtn.trigger("click");

    const oauth = wrapper.emitted("oauth") || [];
    // Expect two emissions
    expect(oauth.length).toBe(2);
    expect(oauth[0][0]).toBe("google");
    expect(oauth[1][0]).toBe("apple");
  });

  test("sets aria-invalid on inputs when errors are present", async () => {
    const wrapper = mountLogin();

    await wrapper.get("form").trigger("submit.prevent");
    await nextTick();

    const user = wrapper.get("#username");
    const pass = wrapper.get("#password");
    expect(user.attributes("aria-invalid")).toBe("true");
    expect(pass.attributes("aria-invalid")).toBe("true");
  });
});
