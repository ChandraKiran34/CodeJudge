#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int longestIncreasingSubsequence(vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }

    int n = nums.size();
    vector<int> dp(n, 1);

    for (int i = 1; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }

    int max_length = 1;
    for (int i = 0; i < n; ++i) {
        max_length = max(max_length, dp[i]);
    }

    return max_length;
}

int main() {
    int n;
    cout << "Enter the number of elements in the array: ";
    cin >> n;

    vector<int> nums(n);
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
    }

    int length = longestIncreasingSubsequence(nums);
    cout << "Length of the longest increasing subsequence: " << length << endl;

    return 0;
}