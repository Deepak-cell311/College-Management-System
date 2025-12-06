

const CookiePolicy = () => {
  return (
    <div title="Cookie Policy" lastUpdated="January 1, 2025">
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">1. What Are Cookies?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and understanding how you use our platform.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">2. How We Use Cookies</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Apex Campus Solutions uses cookies for several purposes:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li><strong>Authentication:</strong> To keep you logged into your account securely</li>
            <li><strong>Preferences:</strong> To remember your settings and preferences</li>
            <li><strong>Security:</strong> To detect and prevent fraudulent activity</li>
            <li><strong>Analytics:</strong> To understand how users interact with our platform</li>
            <li><strong>Performance:</strong> To optimize and improve our services</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">3. Types of Cookies We Use</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="mb-2 font-semibold text-foreground">Essential Cookies</h3>
              <p className="text-sm text-muted-foreground">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 pr-4 text-left font-medium text-foreground">Cookie Name</th>
                      <th className="pb-2 pr-4 text-left font-medium text-foreground">Purpose</th>
                      <th className="pb-2 text-left font-medium text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">session_id</td>
                      <td className="py-2 pr-4">User authentication</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">csrf_token</td>
                      <td className="py-2 pr-4">Security protection</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">user_prefs</td>
                      <td className="py-2 pr-4">User preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="mb-2 font-semibold text-foreground">Performance Cookies</h3>
              <p className="text-sm text-muted-foreground">
                These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us improve our platform's performance and user experience.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 pr-4 text-left font-medium text-foreground">Cookie Name</th>
                      <th className="pb-2 pr-4 text-left font-medium text-foreground">Purpose</th>
                      <th className="pb-2 text-left font-medium text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">_ga</td>
                      <td className="py-2 pr-4">Google Analytics</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">_gid</td>
                      <td className="py-2 pr-4">Google Analytics</td>
                      <td className="py-2">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="mb-2 font-semibold text-foreground">Functional Cookies</h3>
              <p className="text-sm text-muted-foreground">
                These cookies enable enhanced functionality and personalization, such as remembering your language preference or the region you are in.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 pr-4 text-left font-medium text-foreground">Cookie Name</th>
                      <th className="pb-2 pr-4 text-left font-medium text-foreground">Purpose</th>
                      <th className="pb-2 text-left font-medium text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4">language</td>
                      <td className="py-2 pr-4">Language preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">timezone</td>
                      <td className="py-2 pr-4">Timezone setting</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">4. Third-Party Cookies</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            We may use third-party services that set their own cookies. These include:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
            <li><strong>Intercom:</strong> For customer support chat functionality</li>
            <li><strong>Stripe:</strong> For secure payment processing</li>
          </ul>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            These third parties have their own privacy policies governing their use of cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">5. Managing Your Cookie Preferences</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            You have several options for managing cookies:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings. You can block or delete cookies, though this may affect your experience on our platform.</li>
            <li><strong>Cookie Banner:</strong> When you first visit our website, you can set your cookie preferences through our cookie consent banner.</li>
            <li><strong>Account Settings:</strong> Logged-in users can manage certain cookie preferences in their account settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">6. How to Delete Cookies</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            To delete cookies from your browser:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Clear Browsing Data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data → Clear Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Privacy, Search, and Services → Clear Browsing Data</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">7. Impact of Disabling Cookies</h2>
          <p className="leading-relaxed text-muted-foreground">
            If you choose to disable cookies, please be aware that some features of our platform may not function properly. Essential cookies are required for basic functionality such as logging in, accessing secure areas, and using core features. Disabling these cookies will prevent you from using our services effectively.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">8. Do Not Track Signals</h2>
          <p className="leading-relaxed text-muted-foreground">
            Some browsers have a "Do Not Track" feature that signals to websites that you do not want your online activities tracked. Currently, there is no uniform standard for how websites should respond to these signals. We currently do not respond to DNT signals, but you can manage your cookie preferences through the methods described above.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">9. Updates to This Policy</h2>
          <p className="leading-relaxed text-muted-foreground">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">10. Contact Us</h2>
          <p className="leading-relaxed text-muted-foreground">
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
            <p className="font-medium text-foreground">Apex Campus Solutions</p>
            <p className="text-muted-foreground">Email: privacy@apexcampus.com</p>
            <p className="text-muted-foreground">Phone: +91 9876543210</p>
            <p className="text-muted-foreground">Address: 123 Education Street, Tech City, TC 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
