import { generatePortalLink } from "@/actions/generatePortalLink"



function ManageAccountBtn() {
  return (
    <form action={generatePortalLink}>
        <button type="submit">Manage Subscription</button>
    </form>
  )
}

export default ManageAccountBtn