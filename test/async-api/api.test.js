import getSearchList from "../async-api/api.js";
const expect = chai.expect;

let data = await getSearchList();
describe("GET api", function () {
  if (data.status === 200) {
    it("The 200 (OK) status code indicates that the request has succeeded", async () => {
      expect(data.status).to.equal(200);
    });
  }

  if (data.status === 404) {
    it("The 404 (Not Found) status code indicates that the origin server did not find a current representation for the target resource", async () => {
      expect(data.status).to.equal(404);
    });
  }
});