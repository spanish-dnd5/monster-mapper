import json

with open('../spanish-srd5.1-crawl/output/monsters.json', 'r') as f:
    spanish = json.load(f)

with open('en-monsters.json', 'r') as f:
    english = json.load(f)

def search(en):
    result = []
    for es in spanish:
        if all([
            str(es["armor_class"][0]["amount"]) == en['Armor Class'].split()[0],
            str(es["hit_points"]) == en['Hit Points'].split()[0],
            es["challenge_rating"].split()[0] == en['Challenge'].split()[0],
            str(es["abilities"]["strength"]) == en["STR"],
            str(es["abilities"]["dexterity"]) == en["DEX"],
            str(es["abilities"]["constitution"]) == en["CON"],
            str(es["abilities"]["intelligence"]) == en["INT"],
            str(es["abilities"]["wisdom"]) == en["WIS"],
            str(es["abilities"]["charisma"]) == en["CHA"]
        ]):
            result.append(es['name'])
    return result

mapping = []
results = []
exact_results = []
for creature in english:
    possible_spanish = search(creature)
    if possible_spanish:
        results.append(f'{creature["name"]}, {possible_spanish}')
    if len(possible_spanish) == 1:
        exact_results.append(possible_spanish[0])
        mapping.append({'en': creature["name"], 'es': possible_spanish[0]})

print('\n'.join(results))
print(f'{len(results)}/{len(spanish)}')
print(f'{len(exact_results)} with exact results')
print('No match:')
for c in spanish:
    if c['name'] not in exact_results:
        print(c['name'])

with open('src/assets/monster-mapping.json', 'w') as f:
    json.dump(mapping, f)
